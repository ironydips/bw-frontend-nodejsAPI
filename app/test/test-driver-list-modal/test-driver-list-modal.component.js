(function(angular) {
    'use strict';
 	
	function addAdminModalModalController() {
		var ctrl = this;

        ctrl.param = "fbsdgm";
	}

 	angular.module('testDriverListModalModule')
        .component('addADriverModal', {
            templateUrl: 'test/test-driver-list-modal/test-driver-list-modal.template.html',
            //controller: addAdminModalModalController,
            bindings: {
                modalInstance: '<'
               // resolve: '<'
            }
        });

})(window.angular);