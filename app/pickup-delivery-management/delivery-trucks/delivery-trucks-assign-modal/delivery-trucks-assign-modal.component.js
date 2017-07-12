(function(angular) {
'use strict';

function deliverytruckModalController($state,TruckService,DriverService,PickupTruckService) {
	var ctrl = this;
	ctrl.assign = (ctrl.resolve && ctrl.resolve.details) || {};
	
	ctrl.init = function(){
		var tDate = new Date();
		ctrl.todayDate = moment(tDate).format("MM.DD.YYYY");
		ctrl.trucks = ctrl.resolve.trucks;
		ctrl.drivers = ctrl.resolve.drivers;
		ctrl.trkhistories = ctrl.resolve.trkhistories;
		ctrl.isAvail = true;
		}

	ctrl.assign = function(driverid,truckid){
		ctrl.isAvail = true;
		for (var i = 0; i < ctrl.trkhistories.length; i++) {							
    		if((ctrl.trkhistories[i].date == ctrl.todayDate) && (ctrl.trkhistories[i].driverID == driverid) && (ctrl.trkhistories[i].truckID == truckid)){							
    			ctrl.isAvail = false;
    		}	
    	}

    	if(ctrl.isAvail){
			PickupTruckService.assignDriverToTruck(driverid,truckid)
			.then(function(result){
				ctrl.modalInstance.close('update');
			})
			.catch(function(err){
				console.log('Error in assigning truck & driver');
				console.log(err);
			});	
    	}
	};
	
	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
	ctrl.chaeckAvail = function(){
		debugger
	}

	ctrl.init();
}

angular.module('deliverytruckModal')
	.component('deliverytruckModal',{
		templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-assign-modal/delivery-trucks-assign-modal.template.html',
		controller:['$state','TruckService','DriverService','PickupTruckService', deliverytruckModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);