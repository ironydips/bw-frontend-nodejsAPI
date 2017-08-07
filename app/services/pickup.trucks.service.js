(function(angular) {
	"use strict";
	
	function PickupTruckServiceHandler($http){

		var assignDriverToTruck = function(driverid,truckid){
			var obj = {
				"truckID": truckid,
				"driverID": driverid
			}
			return $http({
							url: '/api/pickup/assignDriverToTruck',
				            method: "POST",
				            data: obj,
				            // headers: {
		              //           "Content-Type": "application/x-www-form-urlencoded"
		              //       }
					});
		};

		var unAssignDriverToTruck = function(historyID){
			return $http({
				url: '/api/pickup/unassignDriverToTruck',
				method: "POST",
				data: {"historyID": historyID}
			});
		};

					
		var getDriverTruck = function(){
			return $http({
				url: '/api/pickup/getDriverTruck',
				method: "GET"
			});
		}

		var getAllDriverTruckHistory = function(){
			return $http({
				url: '/api/pickup/getDriverTruckHistory',
				method: "GET",
			});
		};
		
		var getDriverlist = function(){
			return $http({
				url: '/api/pickup/getDriverlist',
				method: "GET",
			});
		};


		//EXPORTED Object
		return {
			assignDriverToTruck,
			unAssignDriverToTruck,
			getAllDriverTruckHistory,
			getDriverTruck,
			getDriverlist
		}
	}

	angular.module('bathwaterApp.services')
		.factory('PickupTruckService',['$http',PickupTruckServiceHandler]);	

})(window.angular);