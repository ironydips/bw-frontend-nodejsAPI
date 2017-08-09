(function(angular) {
    'use strict';

    function TruckModalController($scope,$uibModal, $rootScope, $state, resizeService, TruckService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.truck = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.isDisabled = Object.keys(ctrl.truck).length > 0;
        if (ctrl.truck.images && ctrl.truck.images.length > 0) {
            ctrl.imageUrl = ctrl.truck.images[0].url;
        }
        // Watch the image change and show from base 64 value
        // $scope is only used here for watch.
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.selectedImage;
        }), function(value) {
            value ?
                (ctrl.imageUrl = 'data:image/jpeg;base64, ' + value.base64, ctrl.truck.truckImage = value.base64) : (ctrl.truck.truckImage = '');
        });

        ctrl.save = function() {
            angular.forEach(ctrl.truckDetailForm.$error.required, function(field) {
                field.$setDirty();
            });
            if (!ctrl.truckDetailForm.$invalid) {

                for(var i in ctrl.truck){
                    ctrl.truck[i]= ctrl.truck[i].toLowerCase();
                }
                TruckService.addTruck(ctrl.truck)
                    .then(function(result) {
                        ctrl.modalInstance.close({ action: 'update' });
                    })
                    .catch(function(err) {
                        console.log('Error Adding Truck');
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
        }
        ctrl.viewAssignedDrivers = function(assignedDrivers){
            ctrl.openViewAssignedPopUp(assignedDrivers);
        }

//===========================POPUP IMPLEMENTATION START======================================

        ctrl.openViewAssignedPopUp = function(details){
            
            var modalInstance = ctrl.$uibModal.open({
                component: 'viewAssignedDriverModal',
                windowClass: 'app-modal-window-large',
                keyboard: false,
                resolve:{
                    details: function(){
                        return (details || {});
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

    angular.module('truckModal')
        .component('truckModal', {
            templateUrl: 'admin/truck/truck-modal/truck-modal.template.html',
            controller: ['$scope','$uibModal', '$rootScope', '$state', 'resizeService', 'TruckService', TruckModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
