(function(angular) {
	"use strict";
	
	function TruckServiceHandler($http){

		var getAllTrucks = function(lastKey, limit){
			return $http({	
			    url: '/api/admin/getTrucks?lastKey=' + lastKey + "&limit=" + limit,
			    method: "GET",
			});
		};

		var addTruck = function(truck){
			
			return $http({
							url: '/api/admin/addTruck',
				            method: "POST",
				            data: angular.toJson(truck)
						});
					}

		//EXPORTED Object
		return {
			getAllTrucks,
			addTruck
		}
	}

	angular.module('bathwaterApp.services')
		.factory('TruckService',['$http',TruckServiceHandler]);	

})(window.angular);