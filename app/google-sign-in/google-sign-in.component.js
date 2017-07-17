'use strict';

function GoogleSignInController($state,$interval, $uibModal, GAuth, AdminManagerService, AdminRightsService){

	var ctrl = this;
    ctrl.$uibModal = $uibModal;
   // ctrl.isSuperAdmin = false;
    ctrl.profile ={};
    var rights = {
        isSuperAdmin: false,
         Admin: false,
         Pickup: false,
         Customers: false,
         Inventory: false,
         Warehouse: false
    };


	ctrl.init = function(){
		ctrl.login();
	};

	ctrl.login = function(){
		var CLIENT = angular.config.clientID;
	    GAuth.setClient(CLIENT);

	    var intervalId = $interval(function(){
		    GAuth.checkAuth().then(
		            function (profile) {
		            	$interval.cancel(intervalId);
                        ctrl.loginAdmin(profile);
	         });
		    	console && console.clear ? console.clear() : null;
			},2000);
		};

    ctrl.loginAdmin = function(profile){

            ctrl.profile = profile;
            AdminManagerService.loginAdmin(ctrl.profile.email)
                .then(function(response) {
                    if (response && response.data.result.message) {
                        
                        ctrl.profile.role = response.data.result.message.role;
                        switch(profile.role){
                            case "0":
                                rights.Pickup = true;
                                ctrl.AssignAdmin();
                                break;
                            case "1":
                                rights.Customers = true;
                                ctrl.AssignAdmin();
                                break;
                            case "2":
                                rights.Inventory = true;
                                ctrl.AssignAdmin();
                                break;
                            case "3":
                                rights.Warehouse = true;
                                ctrl.AssignAdmin();
                                break;
                            case "4":
                                rights.Admin = true;
                                ctrl.AssignAdmin();
                                break;
                            case "10":
                                ctrl.AssignSuperadmin();
                                break;
                        }
                    }
                    else{
                        console.log("Server not responding");
                    }
                })
                .catch(function(err) {
                    console.log('Error logging as Admin');
                    console.log(err);
                    ctrl.openPopUp(ctrl.profile);
                });
    };

    ctrl.AssignSuperadmin = function(){
                            rights.isSuperAdmin = true;
                            rights.Customers = true;
                            rights.Inventory = true;
                            rights.Warehouse = true;
                            rights.Admin = true;
                            AdminRightsService.saveProfile(ctrl.profile);
                            AdminRightsService.addRights(rights);
                            $state.go('manageAdmin');
                    };

    ctrl.AssignAdmin = function(){
                            AdminRightsService.saveProfile(ctrl.profile);
                            AdminRightsService.addRights(rights);
                            $state.go('index');
                    };
    ctrl.init();

    //===========================POPUP IMPLEMENTATION START======================================

    ctrl.openPopUp = function(details){
        var modalInstance = ctrl.$uibModal.open({
            component: 'googleModal',
            windowClass: 'app-modal-window-small',
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
                ctrl.init();
                console.log("Success");
            }
                
        }, function(err){
            console.log('Error in Sign In Modal');
            console.log(err);
        })
    }


    }

    angular.module('googleSignIn')
    .component('gSign',{
    	templateUrl: 'google-sign-in/google-sign-in.template.html',
    	controller: ['$state','$interval', '$uibModal','GAuth','AdminManagerService','AdminRightsService', GoogleSignInController]
});