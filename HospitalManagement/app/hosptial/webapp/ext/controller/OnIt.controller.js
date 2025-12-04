sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('hosptial.ext.controller.OnIt', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf hosptial.ext.controller.OnIt
             */
			onInit: function () {

				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				debugger
			},
			// editFlow: {
			// 	onBeforeEdit: async function () {
			// 		debugger;

			// 	var Status = 
			// 	sap.ui.core.Element.getElementById("hosptial::PatientsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::Status::Field-display").getText()				
			// 		if(Status === 'Verified'){
			// 			sap.ui.core.Element.getElementById("hosptial::PatientsObjectPage--fe::StandardAction::Edit").setEnabled(false); 
			// 		}
			// 	}
			// },
			routing: {
				onBeforeBinding: function (oContext) {
					
					console.log("Before Binding", oContext);
				},

			// 	onAfterBinding: async function (oContext) {
			// 		debugger
			// 		var Data = await oContext.requestObject();
			// 		var Status = Data.Status;
			// //	var oEditBtn=sap.ui.core.Element.getElementById("hosptial::PatientsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::Status::Field-display").getText()				
			// 		if(Status === 'Unverified '){
			// 			sap.ui.core.Element.getElementById("hosptial::PatientsObjectPage--fe::StandardAction::Edit").setEnabled(false); 
			// 		}else{
			// 			sap.ui.core.Element.getElementById("hosptial::PatientsObjectPage--fe::StandardAction::Edit").setEnabled(true); 

			// 		}
				
			// 	},
			onAfterBinding: async function (oContext) {
    debugger;

			const data = await oContext.requestObject();
			// 1. Get the inner table of patientsTovisits
			const oTable = sap.ui.getCore().byId(
				"hosptial::PatientsObjectPage--fe::table::patientsTovisits::LineItem::Vistor-innerTable"
			);
			console.log(oTable)

			if (!oTable) {
				console.log("Child table not found yet!");
				return;
			}

		const oBinding = oTable.getBinding("items");

		oBinding.attachEventOnce("dataReceived", async () => {
              
                        const contexts = oBinding.getContexts(); // NOW it has values
 
                        const childData = await Promise.all(
                            contexts.map(c => c.requestObject())
                        );
                        console.log("Child table rows:", childData);
		}
		)
	},

						onBeforeRendering: function () {
							debugger
							console.log("Before Rendering");
						},

			// 	onAfterRendering: function () {
			// 		debugger
			// 		console.log("After Rendering");
			// 	},

			// 	onPageReady: function (oEvent) {
			// 		debugger
			// 		console.log("Page Ready");
			// 	},

			// 	onDisplay: function (oContext) {
			// 		debugger
					
			// 		console.log("Page Displayed", oContext);
			// 	},

			// 	// onBeforeRendering: function () {
			// 	// 	debugger;
			// 	// 	console.log("View will render soon");
			// 	// },
			// 	// onAfterRendering: function (oContext) {
			// 	// 	debugger;

			// 	// const oStatusField = sap.ui.core.Element.getElementById("project1::PatientsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::Status::Field-display").getText()

			// 	// // let status = oStatusField ? oStatusField.getText() : "NOT FOUND";
			// 	// console.log(oStatusField)
			// 	// if(oStatusField==='unverified'){
			// 	// 	sap.ui.core.Element.getElementById("project1::PatientsObjectPage--fe::StandardAction::Edit").setEnabled(false)
			// 	// }
			}
		}
	});
});