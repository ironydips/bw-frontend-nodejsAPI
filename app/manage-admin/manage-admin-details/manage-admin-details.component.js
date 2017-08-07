(function(angular) {

    'use strict'
//===========================manageAdminController IMPLEMENTATION START======================================


    function manageAdminController($state, $uibModal, AdminManagerService) {

        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.adminList = [];

        //API /admin/login
        ctrl.init = function() {
            ctrl.isSuperAdmin = true;
            getAdminList();
          };

        ctrl.continue = function(){
            $state.go('index');
        };

        ctrl.edit = function(adminrights) {
            // angular.bind(ctrl, openPopUpAdmin, angular.copy(adminrights))();
            ctrl.openPopUpAdmin(angular.copy(adminrights));
        };

        ctrl.delete = function(selectedEmail) {

             // angular.bind(ctrl,openPopUpDelete,selectedEmail)();
             ctrl.openPopUpDelete(selectedEmail);
           
        };
        ctrl.selectRow = function(rowIndex){
         ctrl.selectedRow = rowIndex;
        };

        ctrl.addadmin = function() {
            // angular.bind(ctrl, openPopUpAdmin, null)();
            ctrl.openPopUpAdmin(null);
        };

        ctrl.reset = function(){
            ctrl.searchUser = "";
        }

        function getAdminList(){

           AdminManagerService.listofAdmin()
                .then(function(response) {
                    if (response && response.data.result) {
                        ctrl.adminList = response.data.result.message;
                   }
                })
                .catch(function(err) {
                    console.log('Error getting Admin lists:');
                    console.log(err);
                })
        };
        
        ctrl.init();

//===========================POPUP IMPLEMENTATION START======================================

    ctrl.openPopUpDelete = function(details){

        var modalInstance = ctrl.$uibModal.open({
            component:'deleteAdminModal',
            windowClass: 'app-modal-window-small',
            keyboard: false,
            resolve: {
                details: function(){
                    return (details || {});
                }  
            },
            backdrop: 'static'

        });

        modalInstance.result.then(function(data) {
            if (data && data.action == "update") ctrl.init();

        }), function(err){
                console.log('Error in manage-admin Modal');
                console.log(err);
            }
    };

    ctrl.openPopUpAdmin = function(details) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'addAdminModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                },
                adminList: function(){
                    return ctrl.adminList;
                } 
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
            //data passed when pop up closed.
            if (data && data.action == "update") ctrl.init();
            
        }), function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }
    }
//===========================POPUP IMPLEMENTATION END======================================
}
//===========================manageAdminController IMPLEMENTATION END======================================


    angular.module('manageAdmin')
        .component('manageAdmin', {
            templateUrl: 'manage-admin/manage-admin-details/manage-admin-details.template.html',
            controller: ['$state', '$uibModal','AdminManagerService', manageAdminController]
        });
})(window.angular);