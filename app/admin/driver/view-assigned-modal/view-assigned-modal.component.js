(function(angular) {
    'use strict';

    function viewAssignedModalController() {
        var ctrl = this;
        ctrl.assigned = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.assigned.type = ctrl.resolve.type || {};
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('viewAssignedModal')
        .component('viewAssignedModal', {
            templateUrl: 'admin/driver/view-assigned-modal/view-assigned-modal.template.html',
            controller: [viewAssignedModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
