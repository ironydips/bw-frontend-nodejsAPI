(function(angular) {
	"use strict";
	
	function DriverServiceHandler($http){

		var getAllDrivers = function(){
			return $http({
			    url: '/api/admin/getDrivers',
			    method: "GET",
			});
		};

		var addDriver = function(driver){
			return $http({
						url: '/api/admin/addDriver',
			            method: "POST",
			            data: driver,
					});
		}

		//EXPORTED Object
		return {
			getAllDrivers,
			addDriver
		}
	}

	angular.module('bathwaterApp.services')
		.factory('DriverService',['$http',DriverServiceHandler]);	

})(window.angular);