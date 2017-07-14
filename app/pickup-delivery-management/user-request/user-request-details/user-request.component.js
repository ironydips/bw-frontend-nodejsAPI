(function(angular) {
    'use strict';
//===========================UserRequestController IMPLEMENTATION START======================================

    function UserRequestController($state, $uibModal, UserRequestService, PickupTruckService, $q) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.completeRequest = [];
        ctrl.inProgressRequest = [];
        ctrl.notstartedRequest = [];
        ctrl.loader = true;
        ctrl.showNotStarted = true;
        ctrl.showInProgress = false;
        ctrl.showComplete = false;
        ctrl.showCancel = false;


        ctrl.init = function() {

                UserRequestService.getUserList()
                .then(function(response){
                    ctrl.timeslots = response.data.result.message;
                    ctrl.completeRequest = ctrl.timeslots.filter(function(data) {
                        return data.status == "completed";
                    });
                    ctrl.inProgressRequest = ctrl.timeslots.filter(function(data) {
                        return data.status == "in progress";
                    });
                    ctrl.notstartedRequest = ctrl.timeslots.filter(function(data) {
                        return data.status == "not started";
                    });
                    ctrl.cancelRequest = ctrl.timeslots.filter(function(data) {
                        return data.status == "cancelled";
                    });
                    ctrl.loader = false;
                })
                .catch(function(err){
                    console.log('Error User Driver Service..:');
                    console.log(err);
                })


                PickupTruckService.getDriverlist()
                .then(function(response){
                    ctrl.drivers = response.data.result.message;
                })
                .catch(function(err){
                    console.log('Error User Driver Service..:');
                    console.log(err);
                })
        };

        ctrl.complete = function() {
            ctrl.showNotStarted = false;
            ctrl.showInProgress = false;
            ctrl.showComplete = true;
            ctrl.showCancel = false;
        };
        ctrl.notStarted = function() {

            ctrl.showNotStarted = true;
            ctrl.showInProgress = false;
            ctrl.showComplete = false;
            ctrl.showCancel = false;

        };
        ctrl.inprogress = function() {

            ctrl.showNotStarted = false;
            ctrl.showInProgress = true;
            ctrl.showComplete = false;
            ctrl.showCancel = false;
        };
        ctrl.cancel = function() {

            ctrl.showNotStarted = false;
            ctrl.showInProgress = false;
            ctrl.showComplete = false;
            ctrl.showCancel = true;
        };

        ctrl.reset = function(){
            ctrl.searchText = "";
        }
        ctrl.viewUserDetail = function(userDetail) {

            ctrl.userDetailPopUp(userDetail);
        };

        ctrl.assignDriver = function(reqId, dr) {

            ctrl.assignDriverPopUp(reqId, dr);
        };

        ctrl.init();
//===========================POPUP IMPLEMENTATION START======================================

        ctrl.openPopUpCompleted = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'userRequestCompleteModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if(data == "update") this.$state.reload();

            }),
            function(err) {
                console.log('Error in user-request-completed Modal');
                console.log(err);
            }
    };

    ctrl.openPopUpnotstarted = function(details, drivers) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'userRequestNotStartedModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});

                },
                drivers: function() {
                    return (drivers || {})
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //ctrl.loader = false;
                //data passed when pop up closed.
                //if(data == "update") this.$state.reload();

            }),
            function(err) {
                console.log('Error in user-request-notStarted Modal');
                console.log(err);
            }
    };

    ctrl.openPopUpinProgress = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'userRequestInProgressModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if(data == "update") this.$state.reload();

            }),
            function(err) {
                console.log('Error in user-request-inProgress Modal');
                console.log(err);
            }
    };

    ctrl.assignDriverPopUp = function(details, userDetail) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'assignDriverModal',
            windowClass: 'app-modal-window-small',
            resolve: {
                details: function() {
                    return (details || {});
                },
                userDetail: function() {
                    return (userDetail || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                if (data && data.action == 'update') {

                    userDetail.driver = userDetail.driver || {};
                    userDetail.driver.firstName = data.userRequestDetail.firstName;
                    userDetail.driver.lastName = data.userRequestDetail.lastName;
                }


            }),
            function(err) {
                console.log('Error in assign Driver Modal');
                console.log(err);
            }

    }
      ctrl.userDetailPopUp = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'viewUserDetailModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if (data && data.action == "update");

            }),
            function(err) {
                console.log('Error in user detail Modal of Incoming Warehouse');
                console.log(err);
            }
    }
//===========================POPUP IMPLEMENTATION END======================================

}
//===========================UserRequestController IMPLEMENTATION END======================================

    angular.module('userRequest')
        .component('userRequest', {
            templateUrl: 'pickup-delivery-management/user-request/user-request-details/user-request.template.html',
            controller: ['$state', '$uibModal', 'UserRequestService', 'PickupTruckService', '$q', UserRequestController]
        });
})(window.angular);
