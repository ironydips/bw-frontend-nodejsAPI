(function(angular) {
	'use strict';
//===========================DriverDetailsController IMPLEMENTATION START======================================
	function DriverDetailsController($state, $uibModal, $window, $anchorScroll, $location, ngToast, DriverService, ScrollService) {
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
			ctrl.searchUser = "";
		};

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
			if(ctrl.tempDriver != driver){
				if(driver){
					DriverService.searchDrivers(driver)
					.then(function(response){
						ctrl.drivers = response.data.result.message;
						ctrl.showLoader = false;
					})
					.catch(function(err){
						console.log('Error getting driver details:');
						console.log(err);
					})
				}
				else{
					ctrl.drivers = ctrl.tempDrivers;
				}
			}
			ctrl.tempDriver = driver;
		}
		
		ctrl.resetOnBlank = function(driver){
			if(!driver){
				ctrl.drivers = ctrl.tempDrivers;
				ctrl.searchUser = "";
				ctrl.tempDriver = "";
			}
		}

		ctrl.gotoTop = function(loc) {
			ctrl.$location.hash('top');
			ctrl.$anchorScroll();
	      	// ScrollService.getTopScroll(loc);
	     };

		$window.onscroll = function() {
			try{
				if ($window.pageYOffset > 50) {
					angular.element('#gotoTopButton')[0].className = "scrollToTop";
				} else {
					angular.element('#gotoTopButton')[0].className= "";
				}
			}
			catch(err){
			}
		};


	    ctrl.delete = function(driverID){
			ctrl.openDeletePopUp(driverID);
	    };

		ctrl.init();

		function getDriverList(lastKey, limit) {
			DriverService.getAllDrivers(lastKey, limit)
			.then(function(response){
				lastKey == null? ctrl.drivers = response.data.result.message : ctrl.drivers = ctrl.drivers.concat(response.data.result.message) ;
				ctrl.tempDrivers = ctrl.drivers;

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
				if(data && data.action == "update") {
					ctrl.openNotice('added successfully','info');
				}		
			}, function(err){
				console.log('Error in add-driver Modal');
				console.log(err);
			})
		}

		ctrl.openNotice = function (action, type) {
            ngToast.create({
                content: '<span class="glyphicon glyphicon-ok"> <b>Driver</b> '+action ,
                additionalClasses: 'ngtoast-notice--' + type
            });
        };

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
				if(data && data.action == "update") {
					ctrl.openNotice('deleted successfully','info');
				}
					
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
		controller:['$state', '$uibModal','$window','$anchorScroll','$location','ngToast','DriverService','ScrollService', DriverDetailsController]
	});
})(window.angular);