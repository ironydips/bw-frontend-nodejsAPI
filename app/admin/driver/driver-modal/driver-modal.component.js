(function(angular) {
    'use strict';

    function DriverModalController($state, DriverService) {
    	var ctrl = this;

        ctrl.init = function() {
                
                ctrl.driver = (ctrl.resolve && ctrl.resolve.details) || {};
                ctrl.isDisabled = Object.keys(ctrl.driver).length > 0;
            }
            //Add Driver
        ctrl.save = function() {

            angular.forEach(ctrl.driverDetailForm.$error.required, function(field) {
                field.$setDirty();
            });
            if (!ctrl.driverDetailForm.$invalid) {

                DriverService.addDriver(ctrl.driver)
                    .then(function(result) {
                        ctrl.modalInstance.close({ action: 'update' });
                    })
                    .catch(function(err) {
                        console.log('Error Adding Driver');
                        console.log(err);
                    });
            }
        };

        ctrl.showMessage = function(input) {
            var show = input.$invalid && (input.$dirty || input.$touched);
            return show;
        };
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('driverModal')
        .component('driverModal', {
            templateUrl: 'admin/driver/driver-modal/driver-modal.template.html',
            controller: ['$state', 'DriverService', DriverModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
