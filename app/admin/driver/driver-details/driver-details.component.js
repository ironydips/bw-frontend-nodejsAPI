(function(angular) {
'use strict';

//transformed data for display
function transformData(driver){
	driver.streetAddress = driver.address.streetAddress;
	driver.apartment = driver.address.apartment;
	driver.city = driver.address.city;
	driver.state = driver.address.state;
	driver.zipCode = driver.address.zipCode;
	driver.emergencyPhoneNumber = driver.emergencyContactNumber;
	driver.licenseId = driver.licenseID
	return driver;
}

function openPopUp(details){
	
	var popUpCtrl = this;
	var modalInstance = popUpCtrl.$uibModal.open({
			component: 'driverModal',
			windowClass: 'app-modal-window-large',
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
			if(data && data.action == "update") popUpCtrl.init();
			
		}, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
}

function DriverDetailsController($state, $uibModal, DriverService) {
	var ctrl = this;
	
	
	ctrl.init = function(){
		ctrl.$uibModal = $uibModal;
		ctrl.$state = $state;
		ctrl.limit = 30;
		ctrl.lastKey = null;
		ctrl.lastEvaluatedKey = '1';
		ctrl.drivers = [];
		ctrl.getDrivers(ctrl.lastKey, ctrl.limit);
	};

	// Add Driver Modal
	ctrl.addDriver = function(){
		angular.bind(ctrl, openPopUp, null)();
	};

	//Show Driver's Modal
	ctrl.showDetails = function(driverDetails){
		angular.bind(ctrl, openPopUp, driverDetails)();
	}
	 ctrl.getDrivers = function(lastKey, limit) {
    	if(ctrl.lastEvaluatedKey != ctrl.lastKey && !(ctrl.lastKey == null && ctrl.drivers.length > 0)){
			getDriverList(lastKey, limit);
		}
    	ctrl.lastEvaluatedKey = ctrl.lastKey;
	 }

	 ctrl.init();

	 function getDriverList(lastKey, limit) {

		DriverService.getAllDrivers(lastKey, limit)
		.then(function(response){
			lastKey == null? ctrl.drivers = response.data.result.message : ctrl.drivers = ctrl.drivers.concat(response.data.result.message) ;
			ctrl.lastKey = response.data.result.lastKey && response.data.result.lastKey.driverID['S'] || null;
			return ctrl.lastKey;
		})
		.catch(function(err){
			console.log('Error getting driver details:');
			console.log(err);
		})
	}
}

angular.module('driverDetails')
	.component('driverDetails',{
		templateUrl: 'admin/driver/driver-details/driver-details.template.html',
		controller:['$state', '$uibModal','DriverService', DriverDetailsController]
	});
})(window.angular);