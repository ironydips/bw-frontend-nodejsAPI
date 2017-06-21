(function(angular){
'use strict';
//=========================================TimeSlot Controller Start============================================
function TimeslotModalController($state, TimeslotService) {
	var ctrl = this;

	ctrl.init = function(){
		ctrl.currDate = function(){
			var d = new Date();
            var date = ctrl.formateDate(d);
            return date;
		}
		ctrl.selectedDays = {};
		ctrl.selectedAC = {};
		ctrl.weekDayArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		ctrl.timeSlotArr = ['8am-10am', '10am-12pm', '12pm-2pm', '2pm-4pm', '4pm-6pm', '6pm-8pm'];
		ctrl.checkCountSD = 0;
		ctrl.checkCountTS = 0;
	}

	ctrl.save = function() {
	  createTimeSlot();	
      TimeslotService.createTimeSlotsRange(ctrl.resultFinal)
			.then(function(result){
				ctrl.modalInstance.close({action: "update"});
			})
			.catch(function(err){
				console.log('Error Timeslot detail');
				console.log(err);
			});	
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};

	ctrl.endDateChecker = function(){
		ctrl.minDate = ctrl.startDate;
		if(ctrl.endDate < ctrl.startDate){
			ctrl.endDate = "";
		}
		
	}

	ctrl.changedTS = function(n){
		if(ctrl.selectedTS[n]){ //If it is checked
       		ctrl.selectedAC[n] = 0;
       		ctrl.checkCountTS++;
   		}
   		else{
   			delete ctrl.selectedAC[n];
   			delete ctrl.selectedTS[n];
   			ctrl.checkCountTS--;
   		}
	}

	ctrl.changedSD = function(weekDay){
		if(ctrl.selectedDays[weekDay]){
			ctrl.checkCountSD++;
   		}else{
   			delete ctrl.selectedDays[weekDay];
   			ctrl.checkCountSD--;
   		}
	}

	ctrl.enableTS = function(){
		if((ctrl.checkCountSD > 0) && (ctrl.endDate != "")){
   			return true;
   		}else{
   			return false;
   		}	
	}

	ctrl.enableSave = function(){
		if((ctrl.checkCountTS > 0) && (ctrl.checkCountSD > 0) && (ctrl.endDate != "")){
   			return true;
   		}else{
   			return false;
   		}
	}

	ctrl.formateDate = function(date){
		var date =	('0' + (date.getMonth()+1)).slice(-2) + '.'
             		+ ('0' + date.getDate()).slice(-2) + '.'
             		+ date.getFullYear();
    	return date;
	}

	ctrl.init();

	// Creating Timeslot 
	function createTimeSlot(){
		ctrl.resultFinal=[];
		var dateRange =[];
		var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		
		ctrl.startDatePicker = new Date(ctrl.startDate);
		ctrl.endDatePicker = new Date(ctrl.endDate);

		while (ctrl.startDatePicker <= ctrl.endDatePicker) {
						var day = weekDay[ctrl.startDatePicker.getDay()];
						var date = ctrl.formateDate(ctrl.startDatePicker);
						dateRange.push({date:date,day:day});
                        ctrl.startDatePicker.setDate(ctrl.startDatePicker.getDate() + 1);
        }

        console.log(dateRange);

		for (var i = 0; i < dateRange.length; i++) {
         	angular.forEach(ctrl.selectedDays, function(value, key){
				if(dateRange[i].day == key){
					angular.forEach(ctrl.selectedAC, function(value, key){
						ctrl.resultFinal.push({availabilityCount:ctrl.selectedAC[key], date:dateRange[i].date, timeslot:key});
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