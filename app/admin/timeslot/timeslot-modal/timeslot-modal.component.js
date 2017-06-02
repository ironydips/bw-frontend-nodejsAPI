
(function(angular){
'use strict';

function TimeslotModalController($state, TimeslotService) {
	var ctrl = this;
	ctrl.timeslot = {days:{}, timeslots:{}, availables:{}};
	
	ctrl.save = function(){

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

	function dateCalculation(startDate, endDate){
		if(startDate == endDate){
			ctrl.timeslot.date = ctrl.startDate;
		}else{
			var sDate = new Date(startDate);
			var eDate = new Date(endDate);
			dayCal(sDate, eDate);
		}
	}

	function dayCal(sDate, eDate){
		var day = sDate.getDay();
		var weekday =new Array(7);
				weekday[0]="Monday";
				weekday[1]="Tuesday";
				weekday[2]="Wednesday";
				weekday[3]="Thursday";
				weekday[4]="Friday";
				weekday[5]="Saturday";
				weekday[6]="Sunday";

		var count = 1;
		var oneDay = 24*60*60*1000; 
		var diffDays = Math.round(Math.abs((sDate.getTime() - eDate.getTime())/(oneDay)));
		console.log(diffDays)
		
		// for (var i = 0; i <= diffDays; i++) {
		// 	sDate.setDate(sDate.getDate() + 1);
		// 	console.log(sDate);
		// 	return sDate;
		// }

		setDate(sDate, eDate, diffDays);
		
   //          var sday = sDate.getDate();
   //          var syear = sDate.getFullYear();
   //          var emonth = (eDate.getMonth() + 1);
   //          var eday = eDate.getDate();
   //          var eyear = eDate.getFullYear();
		 // if(smonth<=emonth && syear<=eyear){
		 // 	//console.log(sday)
		 // }
		}

		function setDate(sDate, eDate, diffDays){
			if (!(count == diffDays)) {
			sDate.setDate(sDate.getDate() + 1);
			console.log(sDate); 
			}else{
				console.log("same date")
				// var smonth = (sDate.getMonth() + 1);
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