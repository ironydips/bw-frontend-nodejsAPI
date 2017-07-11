(function(angular) {
    'use strict';

    function deleteDriverModalModalController($state, DriverService) {
        var ctrl = this;
        ctrl.driver = (ctrl.resolve && ctrl.resolve.details) || {};
        debugger;
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.delete = function(){
            DriverService.deleteDriver(ctrl.driver.driverID)
            .then(function(response){
                if(response && response.data.result.message == "success") {
                    ctrl.modalInstance.close({ action: 'update'});
                }   
            })
            .catch(function(err){
                console.log('Error deleting driver:');
                console.log(err);
            })
        }
        

    }

    angular.module('deleteDriverModal')
        .component('deleteDriverModal', {
            templateUrl: 'admin/driver/driver-delete-modal/driver-delete-modal.template.html',
            controller: ['$state', 'DriverService', deleteDriverModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
