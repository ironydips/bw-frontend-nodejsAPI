(function(angular) {

	'use strict';

	function AdminPanelController($state, AdminRightsService) {
		var ctrl = this;
		ctrl.userRights = AdminRightsService.getRights();
	}

	angular.module('adminPanel')
	.component('adminPanel',{
		templateUrl: 'admin/admin-panel/admin-panel.template.html',
		controller:['$state','AdminRightsService', AdminPanelController]
	});

})(window.angular);