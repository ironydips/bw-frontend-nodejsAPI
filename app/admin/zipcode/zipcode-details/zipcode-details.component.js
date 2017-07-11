(function(angular) {
'use strict';

//===========================ZipCodeDetailsController IMPLEMENTATION START======================================

function ZipCodeDetailsController($state, $uibModal, ZipcodeService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){
		ZipcodeService.getZipCodes()
		.then(function(response){
			ctrl.zipCodes = response.data.result.message;
		})
		.catch(function(err){
			console.log('Error getting zipcode details:');
			console.log(err);
		})
	};

	//Add ZipCode Modal
	ctrl.addZipCode = function(){
		// angular.bind(ctrl, openPopUp, null)();
		ctrl.openPopUp(null);
	};

	ctrl.deleteZipCode = function(zipcode){
		ctrl.openDeletPopUp(zipcode);
	};

	// ctrl.deleteZipCode = function(zipcode){
	// 	//Show alert and then delete if Yes.

	// 	ZipcodeService.deleteZipCode(zipcode)
	// 	.then(function(response){
	// 		if(response.data.result.message == "success"){
	// 			ctrl.init();
	// 		}
	// 	})
	// 	.catch(function(err){
	// 		console.log('Error getting zipcode details:');
	// 		console.log(err);
	// 	})
	// }

	ctrl.init();

//===========================POPUP IMPLEMENTATION START======================================

	ctrl.openPopUp = function(details){

		var modalInstance = ctrl.$uibModal.open({
			component: 'zipModal',
			windowClass: 'app-modal-window-small',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			if(data && data.action == "update") ctrl.init();
			
		}),function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		}
	}

	ctrl.openDeletPopUp = function(details){

		var modalInstance = ctrl.$uibModal.open({
			component: 'deleteZipcodeModal',
			windowClass: 'app-modal-window-small',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			if(data && data.action == "update") ctrl.init();
			
		}),function(err){
			console.log('Error in deleteZipcodeModal Modal');
			console.log(err);
		}
	}
//===========================POPUP IMPLEMENTATION END======================================
}
//===========================ZipCodeDetailsController IMPLEMENTATION END======================================

angular.module('zipcodeDetails')
	.component('zipcodeDetails',{
		templateUrl: 'admin/zipcode/zipcode-details/zipcode-details.template.html',
		controller:['$state', '$uibModal','ZipcodeService', ZipCodeDetailsController]
	});
})(window.angular);