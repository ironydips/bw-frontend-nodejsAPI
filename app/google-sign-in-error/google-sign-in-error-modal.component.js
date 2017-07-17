(function(angular) {
    'use strict';

    function googleModalModalController($state) {
        var ctrl = this;
        ctrl.result = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.email = ctrl.result.email;
        ctrl.profilePic = ctrl.result.picture;
        debugger
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('googleModal')
        .component('googleModal', {
            templateUrl: 'google-sign-in-error/google-sign-in-error-modal.template.html',
            controller: ['$state', googleModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
