'use strict';

define([
    'mainApp'
    , 'controllers/dashboardController'
    , 'controllers/groupsController'
    , 'controllers/employeesController'
], function ( mainApp
             , DashboardController
             , GroupsController
             , EmployeesController)
    {
        var controllers = function () {
            
            mainApp.controller('DashboardController', ['$scope', '$http', '$timeout', '$location', 'LocalStorageService',
                function ($scope, $http, $timeout, $location, localStorage) {                   
                    var controller = new DashboardController($scope, $http, $timeout, $location, mainApp);
            }]);
            
            mainApp.controller('GroupsController', ['$scope', '$http', '$timeout', '$location', 'LocalStorageService',
                function ($scope, $http, $timeout, $location, localStorage) {                   
                    var controller = new GroupsController($scope, $http, $timeout, $location, mainApp);
            }]);            
            
            mainApp.controller('EmployeesController', ['$scope', '$http', '$timeout', '$location', 'LocalStorageService',
                function ($scope, $http, $timeout, $location, localStorage) {                   
                    var controller = new EmployeesController($scope, $http, $timeout, $location, mainApp);
            }]);
        }
        
        controllers();
        return controllers;
    }
);
