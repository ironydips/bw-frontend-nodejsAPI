(function(angular) {
	"use strict";
	
	function AdminManagerServiceHandler($http, AdminRightsService){

        var key ="";
        var params ={};

		var loginAdmin = function(email){
			return $http({
                    url: '/api/superAdmin/gloginsuccess?email='+ email,
                    method: "GET",
                    headers: {
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                    }
                });
			}

		var listofAdmin = function(){

            key = AdminRightsService.getProfile().key;
            params = JSON.stringify({
                          email: AdminRightsService.getProfile().email
                        });

			return $http({
                    url: '/api/superAdmin/listOfAdmins',
                    method: "GET",
                    // headers: {
                    //     "Authorization": 'Basic YWRtaW46YWRtaW4='
                    // }
                })
		}

		var deleteAdmin = function(params){

            key = AdminRightsService.getProfile().key;

			return $http({
                    url: '/api/superAdmin/deleteAdmin',
                    method: "POST",
                    data: params,
                })
		}

		var addAdmin = function(params){

            key = AdminRightsService.getProfile().key;
        
			return $http({
                    url: '/rest/admin/addAdmin',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": key
                    }
                })
		}

        var editAdmin = function(params){

            key = AdminRightsService.getProfile().key;
            return $http({
                    url: '/api/superAdmin/editAdmin',
                    method: "POST",
                    data: params,
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
