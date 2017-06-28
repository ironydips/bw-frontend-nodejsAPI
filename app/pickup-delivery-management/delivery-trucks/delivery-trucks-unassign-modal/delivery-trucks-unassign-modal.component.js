(function(angular) {
'use strict';

function unAssignDriverToTruckController($state,TruckService,DriverService,PickupTruckService) {
    var ctrl = this;
    ctrl.init = function(){
         ctrl.history = ctrl.resolve.details;
         ctrl.historyID = ctrl.history.historyID;
         ctrl.truckLicensePlate = ctrl.history.truckLicensePlate;
         ctrl.driverName = ctrl.history.driverName;
        }

    ctrl.unAssign = function(historyID){
        PickupTruckService.unAssignDriverToTruck(historyID)
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
    debugger;
}

angular.module('unAssignDriverToTruck')
    .component('unAssignDriverToTruck',{
        templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-unassign-modal/delivery-trucks-unassign-modal.template.html',
        controller:['$state','TruckService','DriverService','PickupTruckService', unAssignDriverToTruckController],
        bindings:{
            modalInstance: '<',
            resolve: '<'
        }
    });

})(window.angular);