(function(angular){
'use strict';
//=========================================TimeSlot Controller Start============================================
function TimeslotModalController($state, TimeslotService) {
	var ctrl = this;

	ctrl.init = function(){
		ctrl.selectedDays = {};
		ctrl.selectedAC = {};
		ctrl.weekDayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		ctrl.timeSlotArr = ['8am-10am', '10am-12pm', '12pm-2pm', '2pm-4pm', '4pm-6pm', '6pm-8pm'];
	}

	ctrl.save = function() {
	  createTimeSlot();	
      /*TimeslotService.createTimeSlotsRange(ctrl.resultFinal)
			.then(function(result){
				ctrl.modalInstance.close({action: "update"});
			})
			.catch(function(err){
				console.log('Error Timeslot detail');
				console.log(err);
			});	*/
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};

	ctrl.endDateChecker = function(){
		ctrl.minDate = ctrl.startDate;
		ctrl.endDate = ctrl.startDate;
	}

	ctrl.changedTS = function(n){
		if(ctrl.selectedTS[n]){ //If it is checked
       		ctrl.selectedAC[n] = 0;
   		}
   		else{
   			delete ctrl.selectedAC[n];
   			delete ctrl.selectedTS[n];
   		}
	}
	ctrl.changedSD = function(weekDay){
		if(ctrl.selectedDays[weekDay]){
   		}
   		else{
   			delete ctrl.selectedDays[weekDay];
   		}
	}

	ctrl.init();

	// Creating Timeslot 
	function createTimeSlot(){
		ctrl.resultFinal=[];
		ctrl.dateRange =[];
		var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		
		ctrl.startDatePicker = new Date(ctrl.startDate);
		ctrl.endDatePicker = new Date(ctrl.endDate);

		while (ctrl.startDatePicker <= ctrl.endDatePicker) {
						var day = weekDay[ctrl.startDatePicker.getDay()];
						var date =   ('0' + (ctrl.startDatePicker.getMonth()+1)).slice(-2) + '.'
             					   + ('0' + ctrl.startDatePicker.getDate()).slice(-2) + '.'
             					   + ctrl.startDatePicker.getFullYear();
						ctrl.dateRange.push({date:date,day:day});
                        ctrl.startDatePicker.setDate(ctrl.startDatePicker.getDate() + 1);
        }

        console.log(ctrl.dateRange);

		for (var i = 0; i < ctrl.dateRange.length; i++) {
         	angular.forEach(ctrl.selectedDays, function(value, key){
				if(ctrl.dateRange[i].day == key){
					angular.forEach(ctrl.selectedAC, function(value, key){
						ctrl.resultFinal.push({availabilityCount:ctrl.selectedAC[key], date:ctrl.dateRange[i].date, timeslot:key});
					});
				}
			});
		}

		console.log(ctrl.resultFinal);
	}
}
//=========================================TimeSlot Controller End============================================

angular.module('timeslotModal')
	.component('timeslotModal',{
		templateUrl: 'admin/timeslot/timeslot-modal/timeslot-modal.template.html',
		controller:['$state','TimeslotService', TimeslotModalController],
		bindings:{
			modalInstance: '<'
		}
	});

})(window.angular)