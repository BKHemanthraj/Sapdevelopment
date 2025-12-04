sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/MessageToast"
], function (Dialog, Button, Input, Label, VBox, HBox, MessageToast) {
    "use strict";

    return {

        /**
         * Custom action from FE (e.g. on List Report / Object Page)
         * @param {sap.ui.model.Context} oContext
         * @param {sap.ui.model.Context[]} aSelectedContexts
         */
        CustomButtonDetail: function (oContext, aSelectedContexts) {
            var that = this;
            var oDialog; // will be assigned later

            // --- Inputs ---
            var oName = new Input({ width: "200px", placeholder: "Enter name" });
            var oAge = new Input({ type: "Number", width: "200px", placeholder: "Enter age" });
            var oPhone = new Input({ width: "200px", maxLength: 10, placeholder: "10-digit phone" });

            // --- Buttons ---
            var oSaveBtn = new Button({
                text: "Save",
                enabled: false,
                press: async function () {
                    await fnSubmit("ACTIVE");
                }
            });

            var oDraftBtn = new Button({
                text: "Draft",
                enabled: false,
                press: async function () {
                    await fnSubmit("DRAFT");
                }
            });

            var oCancelBtn = new Button({
                text: "Cancel",
                press: function () {
                    oDialog.close();
                }
            });

            // --- Validation ---
            function validate() {
                var bValid =
                    oName.getValue().trim() &&
                    oAge.getValue().trim() &&
                    /^[0-9]{10}$/.test(oPhone.getValue());

                oSaveBtn.setEnabled(!!bValid);
                oDraftBtn.setEnabled(!!bValid);
            }

            oName.attachLiveChange(validate);
            oAge.attachLiveChange(validate);
            oPhone.attachLiveChange(validate);

            // --- Layout ---
            var oVBox = new VBox({
                items: [
                    new HBox({
                        items: [
                            new Label({ text: "Name:", width: "120px" }),
                            oName
                        ]
                    }),
                    new HBox({
                        items: [
                            new Label({ text: "Age:", width: "120px" }),
                            oAge
                        ]
                    }),
                    new HBox({
                        items: [
                            new Label({ text: "Phone:", width: "120px" }),
                            oPhone
                        ]
                    })
                ]
            });

            // --- Dialog ---
            oDialog = new Dialog({
                title: "Patient Details",
                contentWidth: "420px",
                content: [oVBox],
                buttons: [oSaveBtn, oDraftBtn, oCancelBtn],
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.open();

            // ==========================
            // Helper: call backend action
            // ==========================
            async function fnSubmit(sStatus) {
                var name = oName.getValue();
                var age = Number(oAge.getValue());
                var phone = oPhone.getValue();

                // Get OData V4 model from context or fallback
                var oModel = oContext && oContext.getModel
                    ? oContext.getModel()
                    : sap.ui.getCore().getModel();

                if (!oModel) {
                    MessageToast.show("OData model not found");
                    return;
                }

                try {
                    // Bind to unbound action /createPatient(...)
                    var oAction = oModel.bindContext("/createPatient(...)");
                    oAction.setParameter("name", name);
                    oAction.setParameter("age", age);
                    oAction.setParameter("phone", phone);
                    oAction.setParameter("status", sStatus); // ACTIVE or DRAFT

                    await oAction.execute();

                    var result = oAction.getBoundContext().getObject(); // PatientID (string)

                    MessageToast.show(
                        (sStatus === "DRAFT" ? "Draft saved. " : "Saved. ") +
                        "PatientID: " + result
                    );
                    oDialog.close();
                } catch (e) {
                    MessageToast.show("Error: " + (e.message || e));
                }
            }
        }
    };
});
