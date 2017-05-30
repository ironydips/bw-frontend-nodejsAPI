(function(angular) {
'use strict';

//transformed data for display
function transformData(truck){
	truck.dealerStreetAddress = truck.dealerAddress.streetAddress;
	truck.dealerCity = truck.dealerAddress.city;
	truck.dealerState = truck.dealerAddress.state;
	truck.dealerZip = truck.dealerAddress.zipCode;
	truck.dealerPhNumber = truck.phoneNumber;
	truck.leaseExpirationDate = truck.leaseExpiration;
	return truck;
}

function openPopUp(details){

	var popUpCtrl = this;
	var modalInstance = popUpCtrl.$uibModal.open({
			component: 'truckModal',
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
			
		}),function(err){
			console.log('Error in add-truck Modal');
			console.log(err);
		}
		
}

function TruckDetailsController($state, $uibModal, resizeService, TruckService) {
	var ctrl = this;
	

	ctrl.init = function(){
		ctrl.$uibModal = $uibModal;
		ctrl.$state = $state;
		ctrl.limit = 30;
		ctrl.lastKey = null;
		ctrl.lastEvaluatedKey = '1';
		ctrl.trucks = [];
		ctrl.getTrucks(ctrl.lastKey, ctrl.limit);
	};

	//Add Truck Modal
	ctrl.addTruck = function(){
		angular.bind(ctrl, openPopUp, null)();
	};

	ctrl.showDetails = function(truckDetails){
		angular.bind(ctrl, openPopUp, truckDetails)();
	}

	ctrl.getTrucks = function(lastKey, limit){
    	if(ctrl.lastEvaluatedKey != ctrl.lastKey && !(ctrl.lastKey == null && ctrl.trucks.length > 0)){
			getTruckList(lastKey, limit);
		}
		ctrl.lastEvaluatedKey = ctrl.lastKey;
	}

	ctrl.init();

	function getTruckList(lastKey, limit) {
		TruckService.getAllTrucks(lastKey, limit)
		.then(function(response){
			lastKey == null? ctrl.trucks = response.data.result.message : ctrl.trucks = ctrl.trucks.concat(response.data.result.message) ;
			ctrl.lastKey = response.data.result.lastKey && response.data.result.lastKey.driverID['S'] || null;
			return ctrl.lastKey;
		})
		.catch(function(err){
			console.log('Error getting trucks details:');
			console.log(err);
		})
	}
}

angular.module('truckDetails')
	.component('truckDetails',{
		templateUrl: 'admin/truck/truck-details/truck-details.template.html',
		controller:['$state', '$uibModal', 'resizeService','TruckService', TruckDetailsController]
	});
})(window.angular);