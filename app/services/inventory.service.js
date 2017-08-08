(function(angular) {
	"use strict";
	
	function InventoryServiceHandler($http){

		
		var getInventory = function(){
			return $http({
		            url: '/api/inventory/getAllInventoryProduct',
		            method: "GET"
	        });
		};

		var updateInventory = function(storedItemID, credit){
			return $http({
		            url: '/api/inventory/updateCredits?storedID='+storedItemID+'&credits='+credit,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		
		

		//EXPORTED Object
		return {
			getInventory,
			updateInventory,
			
		}
	}

	angular.module('bathwaterApp.services')
		.factory('inventoryService',['$http',InventoryServiceHandler]);	

})(window.angular);