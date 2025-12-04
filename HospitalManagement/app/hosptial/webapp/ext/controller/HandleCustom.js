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

        // Handler name must match what you configured in FE (Page Editor)
        CustomDetails: function (oContext, aSelectedContexts) {
            var oDialog;
            var that = this;

            // --- Inputs ---
            var oName  = new Input({ width: "200px", placeholder: "Enter PatientName" });
            var oAge   = new Input({ type: "Number", width: "200px", placeholder: "Enter PatientAge" });
            var oPhone = new Input({ width: "200px", maxLength: 10, placeholder: "10-digit PatientPhone" });

            var oSaveBtn, oDraftBtn;

            // --- Validation ---
            function validate() {
                var valid =
                    oName.getValue().trim() &&
                    oAge.getValue().trim() &&
                    /^[0-9]{10}$/.test(oPhone.getValue());

                if (oSaveBtn)  { oSaveBtn.setEnabled(!!valid); }
                if (oDraftBtn) { oDraftBtn.setEnabled(!!valid); }
            }

            oName.attachLiveChange(validate);
            oAge.attachLiveChange(validate);
            oPhone.attachLiveChange(validate);

            // --- SAVE button (direct call to CreatePatient) ---
            oSaveBtn = new Button({
                text: "Save",
                enabled: false,
                press: function () {
                    debugger
                    var sPatientName  = oName.getValue();
                    var iPatientAge   = Number(oAge.getValue());
                    var sPatientPhone = oPhone.getValue();
                    var sStatus       = "ACTIVE";

                    // --- Get OData V4 model ---
                    var oModel = sap.ui.core.Element.getElementById("hosptial::PatientsList--fe::table::Patients::LineItem::CustomAction::ButtonAction").getModel();
                    try {
                        // 🔹 Call FUNCTION /CreatePatient(...)
                        var oFunc = oModel.bindContext("/CreatePatient(...)");

                        // Parameter names must match service.cds
                        oFunc.setParameter("PatientName",  sPatientName);
                        oFunc.setParameter("PatientAge",   iPatientAge);
                        oFunc.setParameter("PatientPhone", sPatientPhone);
                        oFunc.setParameter("Status",       sStatus);

                        oFunc.execute().then(function () {

                            var sPatientID = oFunc.getBoundContext().getObject(); // returns String

                            MessageToast.show("Saved! PatientID = " + sPatientID);

                            if (oModel.refresh) {
                                oModel.refresh();
                            }
                            oDialog.close();

                        }).catch(function (err) {
                            MessageToast.show("Error while saving");
                            console.error(err);
                        });

                    } catch (e) {
                        MessageToast.show("Error: " + (e.message || e));
                    }
                }
            });

            // --- DRAFT button (same, but Status = DRAFT) ---
            oDraftBtn = new Button({
                text: "Draft",
                enabled: false,
                press: function () {
                    debugger
                    var sPatientName  = oName.getValue();
                    var iPatientAge   = Number(oAge.getValue());
                    var sPatientPhone = oPhone.getValue();
                    var oModel = sap.ui.core.Element.getElementById("hosptial::PatientsList--fe::table::Patients::LineItem::CustomAction::ButtonAction").getModel();


                    try {
                        var oFunc = oModel.bindContext("/CreatePatient_Draft(...)");

                        oFunc.setParameter("PatientName",  sPatientName);
                        oFunc.setParameter("PatientAge",   iPatientAge);
                        oFunc.setParameter("PatientPhone", sPatientPhone);
                        // oFunc.setParameter("Status",       sStatus);

                        oFunc.execute().then(function () {

                            var sPatientID = oFunc.getBoundContext().getObject();

                            MessageToast.show("Draft saved. PatientID = " + sPatientID);

                            if (oModel.refresh) {
                                oModel.refresh();
                            }
                            oDialog.close();

                        }).catch(function (err) {
                            MessageToast.show("Error while saving draft");
                            console.error(err);
                        });

                    } catch (e) {
                        MessageToast.show("Error: " + (e.message || e));
                    }
                }
            });

            // --- CANCEL button ---
            var oCancelBtn = new Button({
                text: "Cancel",
                press: function () {
                    oDialog.close();
                }
            });

            // --- Layout ---
            var oVBox = new VBox({
                items: [
                    new HBox({
                        items: [
                            new Label({ text: "PatientName:", width: "120px" }),
                            oName
                        ]
                    }),
                    new HBox({
                        items: [
                            new Label({ text: "PatientAge:", width: "120px" }),
                            oAge
                        ]
                    }),
                    new HBox({
                        items: [
                            new Label({ text: "PatientPhone:", width: "120px" }),
                            oPhone
                        ]
                    })
                ]
            });

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
        }
    };
});
