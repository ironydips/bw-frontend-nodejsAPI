// 'use strict';


  describe('Unit testing of bathwaterApp:', function () {

  	var $state, $stateParams, $http, $uibModal, service;
  	var $componentController, controller;
  	var $filter, filter;
  	var state = "manageAdmin";
  	var DriverService = {};

  	beforeEach(module('manageAdmin'));
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('bathwaterApp.common'));
	beforeEach(module('addAdminModal'));
	beforeEach(module('deleteAdminModal'));
	beforeEach(module('ui.router'));
  	beforeEach(module('incomingDetails'));
  	beforeEach(module('bathwaterApp.services'));


   
	beforeEach(module('ngResource',	function($provide, $controllerProvider){
		$provide.value('testValue', 4);
		$controllerProvider.register('testCtrl', function($scope){
			this.word = "heya";
			$scope.reverse = function(value){
				return value.split('').reverse().join('');
			};
		});
	}));
	beforeEach(module('bathwaterApp.services', function($provide){
		$provide.value('myservice',34);
	}));
	

	
	it('tests', function(){
		expect(true).toBe(true);
	});

	it('should include dependencies', inject(function($resource, testValue){
		expect($resource).toBeDefined();
		expect(testValue).toBe(4);
	}));

	it('test service provider function', inject(function(myservice){
		expect(myservice).toBe(34);
	}));
	it("test angular injection", function(){
		var $injector = angular.injector();
		expect($injector).toBeDefined();

	});
	it("evaluating expression", inject(function($rootScope,$compile){
		$rootScope.sum =4;
		var expression = '<p>2+2 == {{sum}}</p>';
		var element = $compile(expression)($rootScope);
		$rootScope.$digest();
		expect(element.html()).toBe('2+2 == 4');
	}));
	it("test of resource controller", inject(function($rootScope,$controller){
		var $scope = $rootScope.$new();
	    $controller = $controller("testCtrl", {$scope: $scope});
		expect($controller).toBeDefined();
		expect($controller.word).toBe("heya");
		expect($scope.reverse('test')).toBe('tset');

	}));
	
	it("testing the route of admin manager", inject(function(_$state_,_$rootScope_, $templateCache){
		$state = _$state_;
        $rootScope = _$rootScope_;
        $templateCache.get('app/manage-admin/manage-admin-details/manage-admin-details.template.html');
       

	}));

	 // it('verifies state configuration', function () {
  //           var config = $state.get(state);
  //           console.log(config);
  //          // expect(config.abstract).toBeTruthy();
  //           //expect(config.url).toBeUndefined();
  //       });

  //inventory controller test
	beforeEach(inject(function($rootScope, $componentController){
  	var $scope = $rootScope.$new();
  	controller = $componentController('incomingDetails', {$scope: $scope });

  	}));
  	it("incomining details controller test", inject(function(){
  	//expect(controller.call).toEqual(0);
  	expect(controller).toBeDefined();
  	}));

  	//testing filters:

  	

  	beforeEach(function(){
  		inject(function($injector){
  			$filter = $injector.get("$filter");
  			filter = $filter("YesNo");

  		});
  	});
  	it("test YesNo filters", function(){
  		expect(filter(true)).toEqual('YES');
  		expect(filter(false)).toEqual('NO');
  	});



////service test	

	beforeEach(inject(function(DriverService, $http){
		DriverService = DriverService;
		it("test my user service", function(){
		//expect(DriverService.gotcha).toBe("test");
		expect(DriverService.getAllDrivers).toBeDefined();

	});

	}));
	
	
	//}));
	

	//

///////controller test
	// beforeEach(module('manageAdmin'));
	// beforeEach(module('bathwaterApp.services'));
	//  beforeEach(module(function($provide){
 //     AdminRightsServiceMock = {};        
 //    $provide.value('AdminRightsService', AdminRightsServiceMock);
 //  }));
	// it('admin manager controller', inject(function($rootScope, $componentController,AdminRightsService){
	// 	var $scope = $rootScope.$new();
	// 	service = AdminRightsService;

	// 	var ctrl = $componentController('manageAdmin',
	// 	{	
	// 		$scope: $scope,
	// 		$state: $state,
	// 		$stateParams: $stateParams,
	// 		$http: $http,
	// 		$uibModal: $uibModal,
	// 		AdminRightsService: service

	// 	});
	// 	expect(ctrl).toBeDefined();
	// }));

 });

  // describe('true',function(){
// var $componentController, controller;
// beforeEach(module('manageAdmin'));
// 	beforeEach(inject(function($injector){
// 		$componentController = $injector.get('$componentController');
// 	controller = $componentController('manageAdmin');

// 	}));

// it('initial count 0', function(){

// 	expect(controller).toBeDefined();
// });

// });
// describe('Component: myComponent', function () {
// 	var MyController;
//   var $scope;
//   beforeEach(module('manageAdmin'));
 
   
//   // Initialize the controller and a mock scope.
//   beforeEach(inject(function($rootScope, $controller) {
//     $scope = $rootScope.$new();
//     MyController = $controller('manageAdmin', {
//       $scope: $scope
//     });
//      it('should expose a `manageAdmin` object', function() {
//  	expect(MyController).toBeDefined();
//   });
//     //  createController = function() {
//     //     return $controller('manageAdmin', {
//     //        $scope : scope
//     //     });
//     // };
//   }));
     // var $scope, practiceCtrl;

        // // load the controller's module
        // beforeEach(function () {
        //     // Load the controller's module
        //     module('manageAdmin');

        //     inject(function ($controller, $rootScope) {
        //         $scope = $rootScope.$new();
        //         practiceCtrl = $controller("manageAdmin", {
        //             $scope: $scope
        //         });
        //     });
        //     it('should define a practice property', function () {
        //     expect(practiceCtrl.count).toBe(0);
        // });

        // });
//           var $componentController,$scope;

//   beforeEach(module('manageAdmin'));
//   beforeEach(inject(function($rootScope, _$componentController_){
//     $scope = $rootScope.$new();
//     $componentController = _$componentController_;
//     controller = $componentController('manageAdmin', {$scope:scope});
//     it('should expose a `hero` object', function() {
//     	console.log(controller);
//     // Here we are passing actual bindings to the component
//     //var ctrl = $componentController('manageAdmin', {$scope: $scope});

//     expect(controller).toBeDefined();
//   });
// }));

// });
