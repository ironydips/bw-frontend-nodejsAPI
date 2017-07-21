(function(angular) {
    'use strict';

    function deleteZipcodeModalModalController($rootScope,$state, ZipcodeService) {
        var ctrl = this;
        ctrl.zipcode = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.deleteZipCode = function(){
            ZipcodeService.deleteZipCode(ctrl.zipcode)
            .then(function(response){
                if(response && response.data.result.message == "success") {
                    ctrl.modalInstance.close({ action: 'update'});
                }  
            })
            .catch(function(err){
                console.log('Error getting zipcode details:');
                console.log(err);
            })
        }

    }

    angular.module('deleteZipcodeModal')
        .component('deleteZipcodeModal', {
            templateUrl: 'admin/zipcode/zipcode-delete-modal/zipcode-delete-modal.template.html',
            controller: ['$rootScope','$state', 'ZipcodeService', deleteZipcodeModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
