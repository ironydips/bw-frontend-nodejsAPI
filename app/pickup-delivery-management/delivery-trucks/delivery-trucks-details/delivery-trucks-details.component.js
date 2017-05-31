(function(angular){
	'use strict';

	function openPopUpAssign(details){

		var popUpCtrl = this;
		var modalInstance = popUpCtrl.$uibModal.open({
			component: 'deliverytruckModal',
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
			if(data == "update") popUpCtrl.init();
			
		}), function(err){
			console.log('Error in assign trucks & driver Modal');
			console.log(err);
		}
	}
	function openPopUpHistory(details){

		var popUpCtrl = this;
		var modalInstance = popUpCtrl.$uibModal.open({
			component: 'historyModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details||{});
				}
			},
			backdrop: 'static'
		});
		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") popUpCtrl.$state.reload();
			
		}),function(err){
			console.log('Error in history of trucks details Modal');
			console.log(err);
		}

	}

	function trucksController($state,$uibModal,PickupTruckService){
		var ctrl = this;
		ctrl.$uibModal = $uibModal;
		ctrl.$state = $state;
		ctrl.init = function(){
		//get truck details.
		 PickupTruckService.getAllDriverTruckHistory()
			.then(function(response){
				ctrl.trkhistories = response.data.result.message;
			})
			.catch(function(err){
				console.log('Error getting truck histories details:');
				console.log(err);
			})
		};

		ctrl.assign = function(){
			angular.bind(ctrl,openPopUpAssign,null)();
		};
		ctrl.history = function(){
			angular.bind(ctrl,openPopUpHistory,null)();
		};
		ctrl.init();
		

	}
	
	angular.module('deliveryTrucks')
	.component('deliveryTrucks',{
		templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-details/delivery-trucks-details.template.html',
		controller:['$state','$uibModal','PickupTruckService', trucksController]
	});

})(window.angular);