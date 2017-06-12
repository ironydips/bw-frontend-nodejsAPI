'use strict';

function TestSubPanelController($state) {
	var ctrl = this;
}

angular.module('testSubPanelModule')
.component('testSubPanel',{
	templateUrl: 'test/test-sub-panel/test-sub-panel.template.html',
	controller:['$state', TestSubPanelController]
});