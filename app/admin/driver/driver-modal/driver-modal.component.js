(function(angular) {
    'use strict';

    function DriverModalController($state,$uibModal,$q,$scope, DriverService) {
    	var ctrl = this;

        ctrl.init = function() {

            ctrl.$uibModal = $uibModal;
            ctrl.driver = (ctrl.resolve && ctrl.resolve.details) || {};
            ctrl.isDisabled = Object.keys(ctrl.driver).length > 0;
            ctrl.image = {};
        }
        // if (ctrl.driver.images && ctrl.driver.images.length > 0) {
        //     ctrl.imageUrl = ctrl.driver.images[0].url;
        // }

        // Watch the image change and show from base 64 value
        // $scope is only used here for watch.
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.selectedImage;
        }), function(value) {
            value ?
            (ctrl.imageUrl = 'data:image/jpeg;base64, ' + value.base64, ctrl.image.driverImage = value.base64) : (ctrl.image.driverImage = '');
        });
            //Add Driver
        ctrl.save = function() {

            angular.forEach(ctrl.driverDetailForm.$error.required, function(field) {
                field.$setDirty();
            });

            if (!ctrl.driverDetailForm.$invalid) {

                for(var i in ctrl.driver){
                    ctrl.driver[i]= ctrl.driver[i].toLowerCase();
                }
                DriverService.addDriver(ctrl.driver)
                .then(function(response) {
                    ctrl.addResponse = response.data.result.message;
                    if(ctrl.addResponse == "success"){
                        ctrl.modalInstance.close({ action: 'update' });
                    }
                })
                .catch(function(err) {
                    console.log('Error Adding Driver');
                    console.log(err);
                });
            }
        };

        ctrl.showMessage = function(input) {
            var show = input.$invalid && (input.$dirty || input.$touched);
            return show;
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close({ action: 'cancel' });
        };

        ctrl.viewAssignedTrucks = function(assignedTrucks){
            ctrl.openViewAssignedPopUp(assignedTrucks,"Trucks");
        }

        ctrl.viewAssignedRequests = function(assignedRequests){
            ctrl.openViewAssignedPopUp(assignedRequests,"Requests");
        }

        ctrl.init();

//===========================POPUP IMPLEMENTATION START======================================

        ctrl.openViewAssignedPopUp = function(details,type){
            
            var modalInstance = ctrl.$uibModal.open({
                component: 'viewAssignedModal',
                windowClass: 'app-modal-window-large',
                keyboard: false,
                resolve:{
                    details: function(){
                        return (details || {});
                    },
                    type: function(){
                        return(type || {});
                    }
                },
                backdrop: 'static'
            });

            modalInstance.result.then(function(data){   
                //data passed when pop up closed.
                if(data && data.action == "update") {
                    ctrl.openNotice('added successfully','info');
                    ctrl.init();
                }       
            }, function(err){
                console.log('Error in add-driver Modal');
                console.log(err);
            })
        }
    }

    angular.module('driverModal')
    .component('driverModal', {
        templateUrl: 'admin/driver/driver-modal/driver-modal.template.html',
        controller: ['$state','$uibModal','$q','$scope', 'DriverService', DriverModalController],
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    });
})(window.angular);