(function(angular) {

'use strict';
//===========================TimeslotController IMPLEMENTATION START======================================

function TimeslotController($state, $uibModal, TimeslotService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;
	ctrl.weekDate = [];
	ctrl.asdf;

	ctrl.init = function(){

		TimeslotService.getTimeslotsForTheWeek()
			.then(function(timeslotDetails){
				ctrl.timeslots = timeslotDetails.data.result.message;
				debugger;
				calculateDates(ctrl.timeslots);
			})
			.catch(function(err){
				console.log('Error getting timeslot details:');
				console.log(err);
		})

		
	};

	//Add Timeslot
	ctrl.addTimeslot = function(){
		// angular.bind(ctrl,addTimeslotPopUp,null)();
		ctrl.addTimeslotPopUp(null);
	};
	//Show Timeslot
	ctrl.showallTimeslot = function(){
		// angular.bind(ctrl, showTimeslotPopup, null)();
		ctrl.showTimeslotPopup(null);
	};

	ctrl.init(); 

	ctrl.formateDate = function(date){
		var date =	('0' + (date.getMonth()+1)).slice(-2) + '.'
             		+ ('0' + date.getDate()).slice(-2) + '.'
             		+ date.getFullYear();
    	return date;
	}

	function calculateDates(timesltArr){
		var startDate = new Date(timesltArr[0].date);

		function getMonday(d) {
  			var d = new Date(d);
  			var day = d.getDay(),
      		diff = d.getDate() - day + (day == 0 ? -6:1);
  			return new Date(d.setDate(diff));
			}

		var fDate = getMonday(startDate);

		ctrl.startDatePicker = new Date(fDate);
		var i = 0;
		while (i < 6) {
						var date = ctrl.formateDate(ctrl.startDatePicker);
						ctrl.weekDate.push(date);
                        ctrl.startDatePicker.setDate(ctrl.startDatePicker.getDate() + 1);
                        i++;
        }
	}

//===========================POPUP IMPLEMENTATION START======================================

	ctrl.addTimeslotPopUp = function(details){
		var modalInstance = ctrl.$uibModal.open({
			component: 'timeslotModal',
			windowClass: 'app-modal-window-large',
			resolve: function(){
				return (details||{});
			},
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
					if(data && data.action == "update") ctrl.init();
				
				}),function(err){
					console.log('Error in add-timeslot Modal');
					console.log(err);
			}	
	}
	ctrl.showTimeslotPopup = function(details){
		var modalInstance = ctrl.$uibModal.open({
			component: 'timeslotShowAllModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") this.$state.reload();
			
				}),function(err){
					console.log('Error in show-timeslot Modal');
					console.log(err);
		}	
	}
	//===========================POPUP IMPLEMENTATION END======================================
}
//===========================TimeslotController IMPLEMENTATION END======================================

angular.module('timeslotDetails')
	.component('timeslotDetails',{
		templateUrl: 'admin/timeslot/timeslot-details/timeslot-details.template.html',
		controller:['$state','$uibModal','TimeslotService', TimeslotController]
	});
})(window.angular);
