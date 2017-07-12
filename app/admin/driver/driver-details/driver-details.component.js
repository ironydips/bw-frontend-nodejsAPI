(function(angular) {
	'use strict';
//===========================DriverDetailsController IMPLEMENTATION START======================================
	function DriverDetailsController($state, $uibModal, $anchorScroll, $location, DriverService, ScrollService) {
		var ctrl = this;
		ctrl.init = function(){
			ctrl.$uibModal = $uibModal;
			ctrl.$state = $state;

			ctrl.$anchorScroll = $anchorScroll;
			ctrl.$location = $location;

			ctrl.limit = 30;
			ctrl.lastKey = null;
			ctrl.lastEvaluatedKey = '1';
			ctrl.drivers = [];
			ctrl.getDrivers(ctrl.lastKey, ctrl.limit);
			ctrl.showLoader = false;
			ctrl.initLoader = false;
			ctrl.noData = false;

			ctrl.gotoTopButton = false;
			ctrl.gotoTopButtonStatus = 0;
			ctrl.searchUser = "";
		};




		// ctrl.increment = function() {
		// 	ctrl.gotoTopButtonStatus = 2;
		// 	console.log(ctrl.gotoTopButtonStatus);
		// 	debugger;
		// };
		// ctrl.decrement = function() {
		// 	ctrl.gotoTopButtonStatus = 0;
		// 	debugger;
		// }



		//Add Driver Modal
		ctrl.addDriver = function(){
			ctrl.openPopUp(null);
		};

		//Show Driver's Modal
		ctrl.showDetails = function(driverDetails){
			ctrl.openPopUp(driverDetails);
		}

		ctrl.getDrivers = function(lastKey, limit) {
			if(ctrl.lastEvaluatedKey != ctrl.lastKey && !(ctrl.lastKey == null && ctrl.drivers.length > 0)){
				getDriverList(lastKey, limit);
			}
			ctrl.lastEvaluatedKey = ctrl.lastKey;
			ctrl.showLoader = false;	
		}

		ctrl.search = function(driver){
			driver = driver.toLowerCase();
			DriverService.searchDrivers(driver)
			.then(function(response){
				if(driver){
					ctrl.drivers = response.data.result.message;
					ctrl.showLoader = false;
				}
				else{
					// ctrl.init();
					ctrl.drivers = ctrl.tempDrivers;
					debugger;
				}
				
			})
			.catch(function(err){
				console.log('Error getting driver details:');
				console.log(err);
			})
		}
		
		ctrl.resetOnBlank = function(driver){
			if(!driver){
				ctrl.drivers = ctrl.tempDrivers;
			}
		}

		ctrl.gotoTop = function(loc) {
			ctrl.$location.hash('top');
			ctrl.$anchorScroll();
	      	// ScrollService.getTopScroll(loc);
	     };

	    ctrl.delete = function(driverID){
	  //   	DriverService.deleteDriver(driverID)
			// .then(function(response){
			// 	if(response.data.result.message == "success"){
   //                  ctrl.init();
   //              }	
			// })
			// .catch(function(err){
			// 	console.log('Error deleting driver:');
			// 	console.log(err);
			// })
			ctrl.openDeletePopUp(driverID);
	    }

		ctrl.init();

		function getDriverList(lastKey, limit) {
			DriverService.getAllDrivers(lastKey, limit)
			.then(function(response){
				lastKey == null? ctrl.drivers = response.data.result.message : ctrl.drivers = ctrl.drivers.concat(response.data.result.message) ;

				ctrl.tempDrivers = ctrl.drivers;
				ctrl.gotoTopButtonStatus++;

				ctrl.lastKey = response.data.result.lastKey && response.data.result.lastKey.driverID['S'] || null;
				ctrl.showLoader = true;
				ctrl.initLoader = true;
				if(ctrl.drivers.length == 0){
					ctrl.noData = true;
					ctrl.showLoader = false;
				}
				if(ctrl.lastKey == null){
					ctrl.showLoader = false;
				}
				if(ctrl.gotoTopButtonStatus>1){
					ctrl.gotoTopButton = true;
				}

				return ctrl.lastKey;
			})
			.catch(function(err){
				console.log('Error getting driver details:');
				console.log(err);
			})
		}

		//===========================POPUP IMPLEMENTATION START======================================

		ctrl.openPopUp = function(details){
			
			var modalInstance = ctrl.$uibModal.open({
				component: 'driverModal',
				windowClass: 'app-modal-window-large',
				keyboard: false,
				resolve:{
					details: function(){
						return (details || {});
					}
				},
				backdrop: 'static'
			});

			modalInstance.result.then(function(data){
					//data passed when pop up closed.
				if(data && data.action == "update") ctrl.init();
					
			}, function(err){
				console.log('Error in add-driver Modal');
				console.log(err);
			})
		}

		ctrl.openDeletePopUp = function(details){
			
			var modalInstance = ctrl.$uibModal.open({
				component: 'deleteDriverModal',
				windowClass: 'app-modal-window-small',
				keyboard: false,
				resolve:{
					details: function(){
						return (details || {});
					}
				},
				backdrop: 'static'
			});

			modalInstance.result.then(function(data){
					//data passed when pop up closed.
				if(data && data.action == "update") ctrl.init();
					
			}, function(err){
				console.log('Error in add-driver Modal');
				console.log(err);
			})
		}

		//===========================POPUP IMPLEMENTATION END======================================
	}
	//===========================DriverDetailsController IMPLEMENTATION END======================================
	angular.module('driverDetails')
	.component('driverDetails',{
		templateUrl: 'admin/driver/driver-details/driver-details.template.html',
		controller:['$state', '$uibModal','$anchorScroll','$location','DriverService','ScrollService', DriverDetailsController]
	});
})(window.angular);