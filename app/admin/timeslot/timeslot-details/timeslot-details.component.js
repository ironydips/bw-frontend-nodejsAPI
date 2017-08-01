(function(angular) {

'use strict';
//===========================TimeslotController IMPLEMENTATION START======================================

function TimeslotController($state, $uibModal, moment, TimeslotService) {
	var ctrl = this;

	ctrl.objInit = function(){
		ctrl.timeslotFilter = [];
		ctrl.slotTimeObj = [
							{"timeslot": '8am-10am', "availabilityCount": 0, "bookedCount": 0},
							{"timeslot": '10am-12pm', "availabilityCount": 0, "bookedCount": 0},
							{"timeslot": '12pm-2pm', "availabilityCount": 0, "bookedCount": 0},
							{"timeslot": '2pm-4pm', "availabilityCount": 0, "bookedCount": 0},
							{"timeslot": '4pm-6pm', "availabilityCount": 0, "bookedCount": 0},
							{"timeslot": '6pm-8pm', "availabilityCount": 0, "bookedCount": 0}
						];
	}

	ctrl.init = function(){
		ctrl.objInit();
		ctrl.$uibModal = $uibModal;
		ctrl.$state = $state;
		ctrl.rDateData = [];
		ctrl.weekDate = [];
		ctrl.weekDay = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		ctrl.slotTime = ['8am-10am','10am-12pm','12pm-2pm','2pm-4pm','4pm-6pm','6pm-8pm'];	
		ctrl.mDate = moment().day(1).format('MM.DD.YYYY');
		ctrl.getTimeslotsForTheWeek(ctrl.mDate);
	};

	ctrl.getTimeslotsForTheWeek = function(mDate){

		TimeslotService.getTimeslotsForTheWeek(mDate)
			.then(function(timeslotDetails){
				if(timeslotDetails.data.result.message.length == 0){
					ctrl.noResponse = true;
					ctrl.getWeekDateArr(mDate);
				}else{
					ctrl.noResponse = false;
					ctrl.timeslots = timeslotDetails.data.result.message;	
					calculateDates(ctrl.timeslots);
				}
				
			})
			.catch(function(err){
				console.log('Error getting timeslot details:');
				console.log(err);
			})

		// ctrl.timeslots = [
		// 				{
		// 					availabilityCount:"2",
		// 					date:"07.10.2017",
		// 					timeslot:"12pm-2pm",
		// 					timeslotID:"06aed535-6866-4c72-b9b7-f16e9e34c2a7"
		// 				 },
		// 				{
		// 					availabilityCount:"522",
		// 					date:"07.10.2017",
		// 					timeslot:"4pm-6pm",
		// 					timeslotID:"e0411162-5332-4c43-b683-75ca79606d0d"
		// 				 },
		// 				{
		// 					availabilityCount:"2555",
		// 					date:"07.11.2017",
		// 					timeslot:"12pm-2pm",
		// 					timeslotID:"06aed535-6866-4c72-b9b7-f16e9e34c2a7"
		// 				 },
		// 				{
		// 					availabilityCount:"5",
		// 					date:"07.14.2017",
		// 					timeslot:"4pm-6pm",
		// 					timeslotID:"e0411162-5332-4c43-b683-75ca79606d0d"
		// 				 }
		// 				];
		// if(ctrl.timeslots.length == 0){
		// 	ctrl.noResponse = true;
		// }else{
		// 	ctrl.noResponse = false;
		// 	ctrl.timeslots = ctrl.timeslots;	
		// 	calculateDates(ctrl.timeslots);
		// }
	}

	ctrl.nextTimeslot = function(){
		ctrl.selectedDate = "";
		ctrl.rDateData = [];
		ctrl.weekDate = [];
        ctrl.objInit();
		var mDate = moment(ctrl.mDate);
		ctrl.mDate = mDate.add(7, 'days').format("MM.DD.YYYY");
		ctrl.getTimeslotsForTheWeek(ctrl.mDate);
	}

	ctrl.prevTimeslot = function(){
		ctrl.selectedDate = "";
        ctrl.rDateData = [];
		ctrl.weekDate = [];
        ctrl.objInit();
		var mDate = moment(ctrl.mDate);
		ctrl.mDate = mDate.add(-7, 'days').format("MM.DD.YYYY");
		ctrl.getTimeslotsForTheWeek(ctrl.mDate);
	}
	ctrl.getTimeslotsByDate = function(mDate){
		ctrl.rDateData = [];
		ctrl.weekDate = [];
        ctrl.objInit();
        // ctrl.mDate = mDate;
        ctrl.mDate = moment(mDate).day(1).format('MM.DD.YYYY');
		ctrl.getTimeslotsForTheWeek(ctrl.mDate);
	}

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

	ctrl.getWeekDateArr = function(mDate){
		var startDate = new Date(mDate);
		ctrl.startDatePicker = new Date(startDate);
		var i = 0;
		while (i < 7) {
			var date = moment(ctrl.startDatePicker).format('MM.DD.YYYY');
			ctrl.weekDate.push(date);
		    ctrl.startDatePicker = moment(ctrl.startDatePicker).add(1, 'd');
		    i++;
		}
	}

	ctrl.init(); 

	function calculateDates(timesltArr){

        ctrl.getWeekDateArr(ctrl.mDate);
        
    	for(var x = 0; x< ctrl.weekDate.length; x++){
    	    for(var i = 0; i< ctrl.slotTime.length; i++){					
    	    	for(var j = 0; j< ctrl.timeslots.length; j++){							
    	    		if(ctrl.timeslots[j].timeslot == ctrl.slotTime[i] && ctrl.timeslots[j].date == ctrl.weekDate[x]){							
    	    			ctrl.timeslotFilter.push({"date": ctrl.timeslots[j].date,
    	    									  "timeslot": ctrl.timeslots[j].timeslot,															
    	    									  "availabilityCount": ctrl.timeslots[j].availabilityCount,
    	    									  "bookedCount": ctrl.timeslots[j].bookedCount
    	    									});						
    	    		}					
    	    	}				
    	    }	
    	    for (var i = 0; i < ctrl.slotTimeObj.length; i++) {					
    	    	for (var j = 0; j < ctrl.timeslotFilter.length; j++) {						
    	    		if(ctrl.slotTimeObj[i].timeslot == ctrl.timeslotFilter[j].timeslot){							
    	    			ctrl.slotTimeObj[i].availabilityCount = ctrl.timeslotFilter[j].availabilityCount;						
    	    			ctrl.slotTimeObj[i].bookedCount = ctrl.timeslotFilter[j].bookedCount;						
    	    		}					
    	    	}				
    	    }		
    	    ctrl.rDateData.push(ctrl.slotTimeObj);
    		ctrl.objInit();
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
		controller:['$state','$uibModal','moment','TimeslotService', TimeslotController]
	});
})(window.angular);
