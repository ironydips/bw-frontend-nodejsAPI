(function(angular) {


    'use strict';

    function AssignDriverModalController($state, UserRequestService) {
        var ctrl = this;
        ctrl.userRequestDetail = (ctrl.resolve && ctrl.resolve.userDetail) || {};
        ctrl.drivers = ctrl.resolve.drivers;

        ctrl.init = function() {
            
        }

        ctrl.assignDriver = function() {

            var updatedDriverDetails = angular.fromJson(ctrl.userRequestDetail.selectedDriver);
            UserRequestService.assignDriver(ctrl.userRequestDetail.userRequestID, updatedDriverDetails)
                .then(function(result) {
                    ctrl.modalInstance.close({ action: 'update', userRequestDetail: updatedDriverDetails });
                })
                .catch(function(err) {
                    console.log('Error while assiging driver to user-request');
                    console.log(err);
                });


        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('assignDriverModal')
        .component('assignDriverModal', {
            templateUrl: 'pickup-delivery-management/user-request/assign-driver-modal/assign-driver-modal.template.html',
            controller: ['$state', 'UserRequestService', AssignDriverModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
