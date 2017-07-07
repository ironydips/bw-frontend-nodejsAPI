(function(angular) {
	"use strict";
	
	function ZipcodeServiceHandler($http){

		var getZipCodes = function(){
			return $http({
						    url: '/api/admin/getZipCodes',
						    method: "GET",
						});
					};

		var addZipCode = function(zipcode){
			
			return $http({
							url: '/api/admin/addZipCode',
				            method: "POST",
				            data: zipcode,
						});
					};

		var deleteZipCode = function(zipcode){
			return $http({
						    url: '/api/admin/deleteZipCode?zipcode=' + zipcode,
						    method: "GET",
						});
					};
		//EXPORTED Object
		return {

			getZipCodes,
			addZipCode,
			deleteZipCode
		}
	}

	angular.module('bathwaterApp.services')
		.factory('ZipcodeService',['$http',ZipcodeServiceHandler]);	

})(window.angular);