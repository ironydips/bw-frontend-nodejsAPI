(function(angular) {
    'use strict';
//===========================TruckItemIncomingController IMPLEMENTATION START======================================

    function TruckItemIncomingController($state, $uibModal, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        var date;

        ctrl.init = function() {
            var d = new Date();
            var month = (d.getMonth() + 1);
            var day = d.getDate();
            var year = d.getFullYear();

            if(day < 10){
                day = "0" + day;
            }

            if (month < 10 ) {
                date = "0" + month + "." + day + "." + year;
            } else {
                date = month + "." + day + "." + year;
            }
            ctrl.todayDate = date;
            ctrl.selectedDate(date);
        };

        ctrl.viewReceivedItems = function() {
            ctrl.receiveIncomingProductPopup(null);
        };

        ctrl.viewStoredItems = function() {
            ctrl.storedIncomingProductPopup(null);
        };

        ctrl.viewItems = function(item) {
            ctrl.viewItemPopup(item);
        };

        ctrl.viewDriverDetail = function(driverInfo) {
            ctrl.driverInfoPopup(driverInfo);
        }

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.selectedDate = function(date) {

            ctrl.loader = true;

            warehouseMoveItemService.incomingItems(date)
                .then(function(response) {
                    if (response == undefined || response == null) {
                        ctrl.message = true;
                        ctrl.loader = false;
                    }
                    if (angular.isArray(response.data.result.message)) {
                        ctrl.message = false;
                        ctrl.incomingItems = response.data.result.message;
                        ctrl.loader = false;
                    } else {
                        ctrl.message = true;
                        ctrl.loader = false;
                    }

                })
                .catch(function(err) {
                    
                    console.log('Error getting incoming item details:');
                    console.log(err);
                });
        }

        ctrl.init();

//===========================POPUP IMPLEMENTATION START======================================

    ctrl.driverInfoPopup = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'driverInfoModal',
            windowClass: 'app-modal-window-small',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.

            }),
            function(err) {
                console.log('Error in driver-Info Modal');
                console.log(err);
            }

    }

    ctrl.viewItemPopup = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'viewTruckItemModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.

                if (data && data.action == 'update') ctrl.selectedDate(data.date);
            }),
            function(err) {
                console.log('Error while viewing incoming item modal');
                console.log(err);
            }

    }

    ctrl.receiveIncomingProductPopup = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'receiveincomingProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.

            }),
            function(err) {
                console.log('Error while receiving incoming item modal');
                console.log(err);
            }

    }

    ctrl.storedIncomingProductPopup = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'storedProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.

            }),
            function(err) {
                console.log('Error while storing incoming item modal');
                console.log(err);
            }

    }
//===========================POPUP IMPLEMENTATION END======================================
}
//===========================TruckItemIncomingController IMPLEMENTATION END======================================

    angular.module('truckItemIncomingWarehouseDetails')
        .component('truckItemIncomingWarehouseDetails', {
            templateUrl: 'warehouse/incoming/truckItem-incoming-details/truckItem-incoming-details.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItemService', TruckItemIncomingController]
        });
})(window.angular);
