(function(angular) {
	"use strict";
	
	function DriverServiceHandler($http){

		var getAllDrivers = function(lastKey, limit){
			return $http({
			    url: '/api/admin/getDrivers?lastKey=' + lastKey + "&limit=" + limit,
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
		var driverImageUpload = function(driverImage){
			return $http({
						url: '/api/admin/driverImageUpload',
			            method: "POST",
			            data: driverImage,
			})
		} 

		var searchDrivers = function(driver){
			return $http({
			    url: '/api/admin/searchRecord?firstName='+driver,
			    method: "GET",
			});
		};

		//EXPORTED Object
		return {
			getAllDrivers,
			addDriver ,
			driverImageUpload,
			searchDrivers
		}
	}

	angular.module('bathwaterApp.services')
		.factory('DriverService',['$http',DriverServiceHandler]);	

})(window.angular);