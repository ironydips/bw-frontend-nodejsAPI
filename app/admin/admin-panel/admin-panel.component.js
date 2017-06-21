(function(angular) {

'use strict';

function AdminPanelController($state, AdminRightsService) {
	var ctrl = this;
	var userRights = AdminRightsService.getRights();
	ctrl.isSuperAdmin = userRights.isSuperAdmin;
}

angular.module('adminPanel')
.component('adminPanel',{
	templateUrl: 'admin/admin-panel/admin-panel.template.html',
	controller:['$state','AdminRightsService', AdminPanelController]
});

})(window.angular);