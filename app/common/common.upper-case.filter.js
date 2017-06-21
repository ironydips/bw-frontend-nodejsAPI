(function(angular) {
	"use strict";

	angular.module('bathwaterApp.common')
		.filter('myUpperCaseFilter', function() {
    	return function(x) {
       		var i, c, uppercase = "";
        	for (i = 0; i < x.length; i++) {
            	c = x[i];
            	c = c.toUpperCase();
            	uppercase += c;
        	}
        	return uppercase;
    	};
	});
})(window.angular)