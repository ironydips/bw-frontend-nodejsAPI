(function(angular) {

'use strict';
//===========================TimeslotController IMPLEMENTATION START======================================

function TimeslotController($state, $uibModal, TimeslotService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;
	ctrl.weekDate = [];
	ctrl.remDate  = [];
	ctrl.slotTime = ['8am-10am','10am-12pm','12pm-2pm','2pm-4pm','4pm-6pm','6pm-8pm'];
	ctrl.zero = [];

	ctrl.init = function(){

		TimeslotService.getTimeslotsForTheWeek()
			.then(function(timeslotDetails){
				ctrl.timeslots = timeslotDetails.data.result.message;	
				calculateDates(ctrl.timeslots);
				// for(var i = 0; i< ctrl.timeslots.length; i++){

				// 	for(var j = 0; j< ctrl.slotTime.length; j++){

				// 		for(var k = 0; k< ctrl.weekDate.length; k++){

				// 			if(ctrl.timeslots[i].date == ctrl.weekDate[k]){	

				// 				if(ctrl.timeslots[i].timeslot == ctrl.slotTime[j]){
				// 					var ts = ctrl.timeslots[i].timeslot;
				// 					var date = ctrl.timeslots[i].date;
				// 					var ac = ctrl.timeslots[i].availabilityCount;

				// 					ctrl.zero.push({ts:ts,date:date,ac:ac});
				// 				}
				// 				else{
				// 					if(ctrl.slotTime.indexof(ctrl.timeslots[i].timeslot) > -1){

				// 					}
				// 					// var ts = ctrl.slotTime[j];
				// 					// var date = ctrl.timeslots[i].date;
				// 					// var ac = 0;
				// 					// ctrl.zero.push({ts:ts,date:date,ac:ac});
				// 				}	
				// 			}
				// 			else{
				// 				// var ts = ctrl.slotTime[j]; 
				// 				// var date = ctrl.weekDate[k];
				// 				// var ac = 0;
				// 				// ctrl.zero.push({ts:ts,date:date,ac:ac});
				// 			}
				// 		}
				// 	}
				// }
				// debugger;

				for(var i = 0; i< ctrl.timeslots.length; i++){
					for(var j = 0; j< ctrl.my_array.length; j++){
							if(ctrl.timeslots[i].date==ctrl.my_array[j].date){
								if(ctrl.timeslots[i].timeslot==ctrl.my_array[j].ts){
									ctrl.my_array[j].ac = ctrl.timeslots[i].availabilityCount;
								}
							}
					}
					debugger;
				}
				
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



        ctrl.my_array = [
        [{
            date: weekDate[0],
            ts: slotTime[0],
            ac: 0
        }, {
            date: weekDate[0],
            ts: slotTime[1],
            ac: 0
        }, {
            date: weekDate[0],
            ts: slotTime[2],
            ac: 0
        }],
        [{
            date: weekDate[0],
            ts: slotTime[3],
            ac: 0
        }, {
            date: weekDate[0],
            ts: slotTime[4],
            ac: 0
        }, {
            date: weekDate[0],
            ts: slotTime[5],
            ac: 0
        }]
    ];







				function arr_diff (a1, a2) {

				    var a = [], diff = [];

				    for (var i = 0; i < a1.length; i++) {
				        a[a1[i].date] = true;
				    }

				    for (var i = 0; i < a2.length; i++) {
				        if (a[a2[i]]) {
				            delete a[a2[i]];
				        } else {
				            a[a2[i]] = true;
				        }
				    }

				    for (var k in a) {
				        diff.push(k);
				    }

				    return diff;
				};
				ctrl.diffArr = arr_diff(ctrl.timeslots,ctrl.weekDate);
				debugger;

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
