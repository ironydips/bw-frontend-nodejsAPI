(function(angular) {
    "use strict";

    function TimeslotServiceHandler($http) {

        var getTimeslotsForTheWeek = function() {
            return $http({
                url: '/api/admin/getTimeslotsForTheWeek',
                method: "GET",
            });
        };

        var createTimeSlotsRange = function(timeslot) {

            return $http({
                url: '/api/admin/createTimeSlotsRange',
                method: "POST",
                data: timeslot,
            });
        };

        var getTimeslots = function() {
            return $http({
                url: '/api/admin/getTimeslot',
                method: "GET",
                headers: {
                    'Authorization': "Basic YWRtaW46YWRtaW4="
                }
            });
        }

        var createTimeSlot = function(data) {

                return $http({
                    url: 'rest/createTimeSlot',
                    method: "POST",
                    headers: {
                        'Authorization': "Basic YWRtaW46YWRtaW4=",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });
            }
            //EXPORTED Object
        return {
            getTimeslotsForTheWeek,
            createTimeSlotsRange,
            getTimeslots,
            createTimeSlot
        }
    }

    angular.module('bathwaterApp.services')
        .factory('TimeslotService', ['$http', TimeslotServiceHandler]);

})(window.angular);
