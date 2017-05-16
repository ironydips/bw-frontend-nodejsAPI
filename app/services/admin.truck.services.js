(function(angular) {
	"use strict";
	
	function TruckServiceHandler($http){

		var getAllTrucks = function(){
			return $http({	
			    url: '/api/admin/getTrucks',
			    method: "GET",
			});
		};

		var addTruckwithImage = function(truck){
			
			return $http({
							url: '/rest/addTruckwithImage',
				            method: "POST",
				            data: angular.toJson(truck),
				            headers: {
				                'Authorization': "Basic YWRtaW46YWRtaW4=",
				                'Content-Type': 'text/plain'
				            }
						});
					}

		//EXPORTED Object
		return {
			getAllTrucks,
			addTruckwithImage
		}
	}

	angular.module('bathwaterApp.services')
		.factory('TruckService',['$http',TruckServiceHandler]);	

})(window.angular);