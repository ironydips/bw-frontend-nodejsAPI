(function(angular) {
    'use strict';

    function deleteTruckModalModalController($state, TruckService) {
        var ctrl = this;
        ctrl.truckID = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.delete = function(){
            TruckService.deleteTruck(ctrl.truckID)
            .then(function(response){
                if(response && response.data.result.message == "success") {
                    ctrl.modalInstance.close({ action: 'update'});
                }   
            })
            .catch(function(err){
                console.log('Error deleting truck:');
                console.log(err);
            })
        }
        

    }

    angular.module('deleteTruckModal')
        .component('deleteTruckModal', {
            templateUrl: 'admin/truck/truck-delete-modal/truck-delete-modal.template.html',
            controller: ['$state', 'TruckService', deleteTruckModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
