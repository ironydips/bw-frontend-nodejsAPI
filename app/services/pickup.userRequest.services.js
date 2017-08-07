(function(angular) {
	"use strict";
	
	function UserRequestServiceHandler($http){

		var getUserList = function(){
			return $http({
					        url: "/api/pickup/getUserTS",
					        method: "GET"
            			})
					};

		var assignDriver = function(reqId, driver){
			return $http({
				            url: '/api/pickup/assignDriverToUserRequest?driverID=' + driver.driverID + '&userRequestID=' + reqId,
				            method: "GET"
        				});
					};

		//EXPORTED Object
		return {
			getUserList,
			assignDriver
			
		}
	}

	angular.module('bathwaterApp.services')
		.factory('UserRequestService',['$http',UserRequestServiceHandler]);	

})(window.angular);
