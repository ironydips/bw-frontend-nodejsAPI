(function(angular){
	'use strict';
	
	function sampleData(){
		var ctrl = this;
		ctrl.name = "Driver";
	}
	
	angular.module('testDriverListModule')
	.component('testDriverList',{
		templateUrl: 'test/test-driver-list/test-driver-list.template.html',
		controller: sampleData
	});

})(window.angular);