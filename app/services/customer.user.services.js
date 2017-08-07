(function(angular) {
	"use strict";
	
	function CustomerUserServiceHandler($http){

		var getUsers = function(){
			return $http({
		            url: '/api/customer/getUsers',
		            method: "GET",
	        });
		};

		var getUserInventory = function(userID){
			return $http({
		            url: '/rest/getUserInventory?userid='+ userID,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		var getUserRequest = function(userID){
			return $http({
		            url: '/api/customer/getUserRequests?userID='+ userID,
		            method: "GET"
	        });
		};
		// var getTrucksByUserrequests = function(){
		// 	return $http({
		//             url: '/admin/getTrucksByUserrequests?date='+ "21/03/2017",
		//             method: "GET",
		//             headers:{
	 //            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	 //            }
	 //        });
		// };
		

		//EXPORTED Object
		return {
			getUsers,
			getUserInventory,
			getUserRequest,
		}
	}

	angular.module('bathwaterApp.services')
		.factory('customerUserService',['$http',CustomerUserServiceHandler]);	

})(window.angular);