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

		var getDriverlist = function(){
			return $http({
			    url: '/api/admin/getDrivers?drivers=' + "drivers",
			    method: "GET",
			});
		};

		var getTrucklist = function(){
			return $http({
				url: '/api/admin/getTrucks?trucks=' + "trucks",
				method: "GET"
			});
		}
					
		var getAllDriverTruckHistory = function(){
			return $http({
				            url: '/api/pickup/getDriverTruckHistory',
				            method: "GET",
	        		});
				};

		//EXPORTED Object
		return {
			assignDriverToTruck,
			unAssignDriverToTruck,
			getAllDriverTruckHistory,
			getDriverlist,
			getTrucklist	
		}
	}

	angular.module('bathwaterApp.services')
		.factory('PickupTruckService',['$http',PickupTruckServiceHandler]);	

})(window.angular);