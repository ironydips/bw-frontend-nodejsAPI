(function(angular){
	'use strict';
	
	function sampleData(){
		var ctrl = this;
		ctrl.name = "Test";
	}
	
	angular.module('testDataModule')
	.component('testData',{
		templateUrl: 'test/test-data.template.html',
		controller: sampleData
	});

})(window.angular);