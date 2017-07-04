(function(angular) {
	"use strict";
	
	function AdminManagerServiceHandler($http, AdminRightsService){

        var key ="";
        var params ={};

		var loginAdmin = function(email){
			return $http({
                    url: '/api/superAdmin/gloginsuccess?email='+ email,
                    method: "GET",
                });
			}

		var listofAdmin = function(){

			return $http({
                    url: '/api/superAdmin/listOfAdmins',
                    method: "GET",
                })
		}

		var deleteAdmin = function(params){

			var obj = angular.fromJson(params);
			return $http({
                    url: '/api/superAdmin/deleteAdmin?email='+ obj.email,
                    method: "GET",
                })
		}

		var addAdmin = function(params){

			return $http({
                    url: '/api/superAdmin/addAdmin',
                    method: "POST",
                    data: params,
                })
		}

        var editAdmin = function(params){

        	var obj = angular.fromJson(params);
            return $http({
                    url: '/api/superAdmin/editAdmin?email='+ obj.email + "&role="+ obj.role,
                    method: "GET",
                })
        }


   

        //EXPORTED Object
        
		return {
			loginAdmin,
			listofAdmin,
			deleteAdmin,
			addAdmin,
            editAdmin
		}
	
	}

	angular.module('bathwaterApp.services')
		.factory('AdminManagerService',['$http','AdminRightsService', AdminManagerServiceHandler]);	

})(window.angular);
