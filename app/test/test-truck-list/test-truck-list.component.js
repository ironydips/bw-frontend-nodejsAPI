(function(angular){
	'use strict';
	
	function sampleData(){
		var ctrl = this;
		ctrl.name = "Truck";
	}
	
	angular.module('testTruckListModule')
	.component('testTruckList',{
		templateUrl: 'test/test-truck-list/test-truck-list.template.html',
		controller: sampleData
	});truck

})(window.angular);