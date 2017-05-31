(function(angular) {
'use strict';

function deliverytruckModalController($state,$q,TruckService,DriverService,PickupTruckService) {
	var ctrl = this;
	ctrl.assign = (ctrl.resolve && ctrl.resolve.details) || {};
	
	ctrl.init = function(){

		$q.all([PickupTruckService.getTrucklist(), PickupTruckService.getDriverlist()])
			.then(function(response){
				ctrl.trucks = response[0].data.result.message;
				ctrl.drivers = response[1].data.result.message;
			})
			.catch(function(err){
				console.log('Error getting driver list details:/Error getting truck details:');
	 			console.log(err);
			});
		}

	ctrl.assign = function(driverid,truckid){
		//debugger;
		PickupTruckService.assignDriverToTruck(driverid,truckid)
					.then(function(result){
						ctrl.modalInstance.close('update');
				})
					.catch(function(err){
						console.log('Error in assigning truck & driver');
						console.log(err);
			});
		};
	
	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}

	 ctrl.init();
}

angular.module('deliverytruckModal')
	.component('deliverytruckModal',{
		templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-assign-modal/delivery-trucks-assign-modal.template.html',
		controller:['$state','$q','TruckService','DriverService','PickupTruckService', deliverytruckModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);