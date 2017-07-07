(function(angular) {
'use strict';
//===========================TruckDetailsController IMPLEMENTATION START======================================
function TruckDetailsController($state, $uibModal, $anchorScroll, $location, resizeService, TruckService) {
	var ctrl = this;
	ctrl.init = function(){
		ctrl.$uibModal = $uibModal;
		ctrl.$state = $state;

		ctrl.$anchorScroll = $anchorScroll;
		ctrl.$location = $location;

		ctrl.limit = 30;
		ctrl.lastKey = null;
		ctrl.lastEvaluatedKey = '1';
		ctrl.trucks = [];
		ctrl.getTrucks(ctrl.lastKey, ctrl.limit);
		ctrl.showLoader = false;
		ctrl.initLoader = false;
		ctrl.noData = false;
	};

	//Add Truck Modal
	ctrl.addTruck = function(){
		//angular.bind(ctrl, openPopUp, null)();
		ctrl.openPopUp(null);
	};

	ctrl.showDetails = function(truckDetails){
		// angular.bind(ctrl, openPopUp, truckDetails)();
		ctrl.openPopUp(truckDetails);
	}

	ctrl.getTrucks = function(lastKey, limit){
    	if(ctrl.lastEvaluatedKey != ctrl.lastKey && !(ctrl.lastKey == null && ctrl.trucks.length > 0)){
			getTruckList(lastKey, limit);
		}
		ctrl.lastEvaluatedKey = ctrl.lastKey;
    	ctrl.showLoader = false;
	}

	ctrl.search = function(truck){
		truck = truck.toLowerCase();
		TruckService.searchTrucks(truck)
		.then(function(response){
			if(truck){
				ctrl.trucks = response.data.result.message;
				ctrl.showLoader = false;
			}
			else{
				// ctrl.init();
				ctrl.trucks = ctrl.tempTrucks;
			}
			
		})
		.catch(function(err){
			console.log('Error getting truck details:');
			console.log(err);
		})
	}

	ctrl.gotoTop = function(loc) {
      	ctrl.$location.hash('top');
      	ctrl.$anchorScroll();
    };

	ctrl.init();

	function getTruckList(lastKey, limit) {
		TruckService.getAllTrucks(lastKey, limit)
		.then(function(response){
			lastKey == null? ctrl.trucks = response.data.result.message : ctrl.trucks = ctrl.trucks.concat(response.data.result.message) ;
			ctrl.lastKey = response.data.result.lastKey && response.data.result.lastKey.driverID['S'] || null;
			
			ctrl.tempTrucks = ctrl.trucks;

			ctrl.showLoader = true;
			ctrl.initLoader = true;
			if(ctrl.trucks.length == 0){
				ctrl.noData = true;
				ctrl.showLoader = false;
			}
			if(ctrl.lastKey == null){
				ctrl.showLoader = false;
			}
			return ctrl.lastKey;
		})
		.catch(function(err){
			console.log('Error getting trucks details:');
			console.log(err);
		})
	}

//===========================POPUP IMPLEMENTATION START======================================

ctrl.openPopUp = function(details){

	var modalInstance = ctrl.$uibModal.open({
			component: 'truckModal',
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
			
		}),function(err){
			console.log('Error in add-truck Modal');
			console.log(err);
		}		
	}
//===========================POPUP IMPLEMENTATION END======================================
}
//===========================TruckDetailsController IMPLEMENTATION END======================================

angular.module('truckDetails')
	.component('truckDetails',{
		templateUrl: 'admin/truck/truck-details/truck-details.template.html',
		controller:['$state', '$uibModal','$anchorScroll','$location', 'resizeService','TruckService', TruckDetailsController]
	});
})(window.angular);