(function(angular) {
    "use strict";

    angular.module('bathwaterApp.common')
        .filter('myShowDateFilter', function() {
        return function(x) {

            var dateFormated = "";
            if(x){
                dateFormated = x.slice(3,6) + x.slice(0,3) + x.slice(6,10);
            }
            
            return dateFormated;
        };
    });
})(window.angular)