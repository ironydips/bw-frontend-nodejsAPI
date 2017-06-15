(function(angular){
	'use strict';
	function abc(detail){
		var popCtrl = this;
		var modalInstance = popCtrl.$uibModal.open({
				component: 'addADriverModal',
           		windowClass: 'app-modal-window-large',
           		keyboard: false,
           		backdrop: 'true'
			});
	}
	function sampleData($uibModal){
		var ctrl = this;
		ctrl.$uibModal = $uibModal;
		ctrl.name = "Driver";
		ctrl.adddriverpopup = function(){
			angular.bind(ctrl, abc, null)();
		};
	}
	
	angular.module('testDriverListModule')
	.component('testDriverList',{
		templateUrl: 'test/test-driver-list/test-driver-list.template.html',
		controller: ['$uibModal', sampleData]
	});

})(window.angular);