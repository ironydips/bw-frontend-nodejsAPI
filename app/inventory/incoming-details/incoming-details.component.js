(function(angular){
	'use strict';
//===========================inventoryIncomingDetailsController IMPLEMENTATION START======================================

	function inventoryIncomingDetailsController($state, $uibModal,Lightbox, inventoryService){
		var ctrl = this;
		ctrl.$state = $state;
		ctrl.$uibModal = $uibModal;

		ctrl.init = function(){

			inventoryService.getInventory()
					.then(function(response){
						ctrl.Inventory = response.data.result.message;
						for (var i = 0; i < ctrl.Inventory.length; i++) {
			                if (ctrl.Inventory[i].imageURLs == null || ctrl.Inventory[i].imageURLs.length == 0 || typeof item.items[i].imagesBase64[j] == "undefined") {
			                    ctrl.Inventory[i].imageURLs = ["img/notAvailable.jpg"];
			                }
			            }
					})
					.catch(function(err){
						console.log('Error getting user-items details:');
						console.log(err);
					});			
		};

		ctrl.openLightboxModal = function (images) {
		//LightBox Library used as Image Viewer.
			Lightbox.openModal(images, 0);
  		};
  		ctrl.selectRow = function(rowIndex){
         ctrl.selectedRow = rowIndex;
    	};

		ctrl.addUpdateCredit = function(item){
			// angular.bind(ctrl, openPopupCreditUpdate, angular.copy(item))();
			ctrl.openPopupCreditUpdate(angular.copy(item));
		};

		ctrl.init();
//===========================POPUP IMPLEMENTATION START======================================

		ctrl.openPopupCreditUpdate = function(details){

	        var modalInstance = ctrl.$uibModal.open({
	            component: 'updateCreditModal',
	            windowClass: 'app-modal-window-small',
	            keyboard: false,
	            resolve: {
	                details: function() {
	                    return (details || {});
	                }
	            },
	            backdrop: 'static'
	        });

	        modalInstance.result.then(function(data) {
	            //data passed when pop up closed.
	            //if (data && data.action == "update");
	            if(data && data.action == "update") ctrl.init();
	            
	        }), function(err) {
	            console.log('Error in inventory-incoming-credit-update Modal');
	            console.log(err);
	        }
		}
//===========================POPUP IMPLEMENTATION END======================================

	}	
//===========================inventoryIncomingDetailsController IMPLEMENTATION END======================================
	
	angular.module('inventoryIncomingDetails')
	.component('inventoryIncomingDetails',{
		templateUrl: 'inventory/incoming-details/incoming-details.template.html',
		controller:['$state','$uibModal','Lightbox','inventoryService', inventoryIncomingDetailsController]
	});

})(window.angular);