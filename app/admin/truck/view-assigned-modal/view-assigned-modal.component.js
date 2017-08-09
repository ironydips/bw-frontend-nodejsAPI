(function(angular) {
    'use strict';

    function viewAssignedModalController() {
        var ctrl = this;
        ctrl.assigned = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('viewAssignedDriverModal')
        .component('viewAssignedDriverModal', {
            templateUrl: 'admin/truck/view-assigned-modal/view-assigned-modal.template.html',
            controller: [viewAssignedModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
