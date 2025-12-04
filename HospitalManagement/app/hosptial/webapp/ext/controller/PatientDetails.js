sap.ui.define([
  "sap/ui/core/Fragment",
  "sap/m/MessageToast"
], function (Fragment, MessageToast) {
  "use strict";

  return {
    // called from your main view (or another controller) to open the dialog
    openDialog: function () {
      var oView = this.getView();

      if (!this._oDialog) {
        Fragment.load({
          id: oView.getId(),                             // prefix IDs with view id
          name: "hosptial.ext.fragment.PatientDialog",  // must match file path/name
          controller: this                              // this controller handles fragment events
        }).then((oDialog) => {                          // use arrow function — avoids bind issues
          this._oDialog = oDialog;
          oView.addDependent(oDialog);
          this._clearDialogFields();
          oDialog.open();
        });
      } else {
        this._clearDialogFields();
        this._oDialog.open();
      }
    },

    _getDialogInputs: function () {
      return {
        Name: this._oDialog.byId("patientName").getValue(),
        City: this._oDialog.byId("patientCity").getValue()
      };
    },

    _clearDialogFields: function () {
      if (this._oDialog) {
        this._oDialog.byId("patientName").setValue("");
        this._oDialog.byId("patientCity").setValue("");
      }
    },

    onSavePress: function () {
      var oData = this._getDialogInputs();
      if (!oData.Name) { MessageToast.show("Enter name"); return; }
      // do your model create logic here
      MessageToast.show("Save: " + oData.Name + " - " + oData.City);
      this._oDialog.close();
    },

    onDraftPress: function () {
      var oData = this._getDialogInputs();
      MessageToast.show("Draft: " + oData.Name);
      this._oDialog.close();
    },

    onCancelPress: function () {
      this._oDialog.close();
    },

    onExit: function () {
      if (this._oDialog) {
        this._oDialog.destroy();
        this._oDialog = null;
      }
    }
  };
});
