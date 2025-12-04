sap.ui.define([
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function(Fragment, MessageToast, MessageBox) {
  "use strict";

  return {
    /**
     * Open the dialog fragment (create on demand)
     */
    openAddViaUrlDialog: function () {
      var oView = this.getView();

      // create dialog lazily
      if (!this._oAddViaUrlDialog) {
        // first arg: prefix (view id) so controls can be accessed with this.byId(...)
        this._oAddViaUrlDialog = sap.ui.xmlfragment(oView.getId(),
          "hosptial.ext.fragment.Fragments1", // fragment module path (replace with your fragment path)
          this // controller as event handler
        );
        // attach as dependent so lifecycle & models are inherited
        oView.addDependent(this._oAddViaUrlDialog);
      }

      // optionally clear previous values
      this.byId("urlInput").setValue("");
      this.byId("nameInput").setValue("");

      this._oAddViaUrlDialog.open();
    },

    /**
     * Handler for Add button in fragment
     */
    handleAddViaUrl: function () {
      // get values from fragment inputs (this.byId works because fragment created with view prefix)
      var sUrl = this.byId("urlInput").getValue().trim();
      var sName = this.byId("nameInput").getValue().trim();

      // simple validation
      if (!sUrl) {
        MessageBox.warning("Please enter a URL.");
        return;
      }
      if (!sName) {
        MessageBox.warning("Please enter a Name.");
        return;
      }

      // optional: basic URL pattern check (very simple)
      var urlPattern = /^(https?:\/\/).+/i;
      if (!urlPattern.test(sUrl)) {
        MessageBox.warning("URL should start with http:// or https://");
        return;
      }

      // Now do the actual work - example: build object and send to model or event bus
      var oNewDoc = {
        Name: sName,
        Url: sUrl,
        CreatedAt: new Date().toISOString()
      };

      // Example: if you have a JSONModel or ODataModel, push/save here
      // var oModel = this.getView().getModel("documents");
      // oModel.setProperty("/items/" + <newIndex>, oNewDoc);
      // or call oModel.create("/Documents", oNewDoc, { success: ..., error: ... });

      // For demo show toast and close
      MessageToast.show("Document added: " + sName);
      this._closeAddViaUrlDialog(); // internal close + cleanup
    },

    /**
     * Called by fragment Cancel button (XML: press=".closeAddViaUrlFragment")
     */
    closeAddViaUrlFragment: function () {
      // use internal close helper
      this._closeAddViaUrlDialog();
    },

    /**
     * Internal helper: close + optionally destroy
     */
    _closeAddViaUrlDialog: function () {
      if (this._oAddViaUrlDialog) {
        this._oAddViaUrlDialog.close();

        // If you plan to reopen and keep state, do NOT destroy.
        // If you want fresh instance each time, destroy and clear ref:
        // this._oAddViaUrlDialog.destroy();
        // this._oAddViaUrlDialog = null;
      }
    },

    /**
     * If controller is destroyed, clean up fragment to prevent memory leaks
     */
    onExit: function () {
      if (this._oAddViaUrlDialog) {
        this._oAddViaUrlDialog.destroy();
        this._oAddViaUrlDialog = null;
      }
    }
  };
});
