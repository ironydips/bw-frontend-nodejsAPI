
(function(angular){
'use strict';

function TimeslotModalController($state, TimeslotService) {
	var ctrl = this;

	ctrl.init = function(){
		ctrl.timeslot = {days:{}, timeslots:{}, availables:{}};
		ctrl.selectedDays = {};
		// ctrl.timeslots = [
		// 	s0: ""
		// ];
	}
	
	ctrl.save = function(){
		console.log(ctrl.selectedTS)
		dateCalculation(ctrl.startDate, ctrl.endDate);

		// TimeslotService.createTimeSlotsRange(ctrl.timeslot)
		// 	.then(function(result){
		// 		ctrl.modalInstance.close({action: "update"});
		// 	})
		// 	.catch(function(err){
		// 		console.log('Error Timeslot detail');
		// 		console.log(err);
		// 	});
			
		};

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};

	ctrl.init();

	function dateCalculation(startDate, endDate){

		ctrl.filteredDate = [];
		ctrl.DateArr = [];
		if(startDate == endDate){
			ctrl.timeslot.date = ctrl.startDate;
		}else{
			var sDate = new Date(startDate);
			var eDate = new Date(endDate);
					
			while(sDate <= eDate){
				var weekday =new Array(7);
				weekday[1]="Monday";
				weekday[2]="Tuesday";
				weekday[3]="Wednesday";
				weekday[4]="Thursday";
				weekday[5]="Friday";
				weekday[6]="Saturday";
				weekday[7]="Sunday";

				var date = sDate.getDate();
				var month = sDate.getMonth();
				var year = sDate.getFullYear();
				var day = weekday[sDate.getDay()];
				if(date < 10) date = "0" + date;
				if(month < 10) month = "0" + month; 
				var obj = {
					selectedDate : month + "." + date + "." + year,
					weekday : day
				}
				ctrl.DateArr.push(obj);
				sDate.setDate(sDate.getDate() + 1);

			}
			
				angular.forEach(ctrl.selectedDays, function(value, key){
					for (var i = 0; i < ctrl.DateArr.length; i++) {
						if(ctrl.DateArr[i].weekday == key){
							ctrl.filteredDate.push(ctrl.DateArr[i]);
						}
					}
				});


							console.log(ctrl.filteredDate)
		}
	}
}

angular.module('timeslotModal')
	.component('timeslotModal',{
		templateUrl: 'admin/timeslot/timeslot-modal/timeslot-modal.template.html',
		controller:['$state','TimeslotService', TimeslotModalController],
		bindings:{
			modalInstance: '<'
		}
	});

})(window.angular)