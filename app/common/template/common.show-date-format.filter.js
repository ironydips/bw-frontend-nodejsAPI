(function(angular) {
	"use strict";

	angular.module('bathwaterApp.common')
		.filter('myShowDateFilter', function() {
    	return function(x) {
       		var i, c, dateFormated = "";
        	for (i = 3; i < 6; i++) {
            	c = x[i];
            	dateFormated += c;
        	}
            for (i = 0; i < 3; i++) {
                c = x[i];
                dateFormated += c;
            }
            for (i = 6; i < x.length; i++) {
                c = x[i];
                dateFormated += c;
            }
        	return dateFormated;
    	};
	});
})(window.angular)