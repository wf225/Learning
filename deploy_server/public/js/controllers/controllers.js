'use strict';

define([
    'mainApp'
    , 'controllers/dashboardController'
    , 'controllers/deploysheetController'
    , 'controllers/cookbookController'
], function ( mainApp
             , DashboardController
             , DeploysheetController
             , CookbookController)
    {
        var controllers = function () {
            
            mainApp.controller('DashboardController', ['$scope', '$http', '$timeout', '$location', 'LocalStorageService',
                function ($scope, $http, $timeout, $location, localStorage) {                   
                    var controller = new DashboardController($scope, $http, $timeout, $location, mainApp);
            }]);
            
            mainApp.controller('DeploysheetController', ['$scope', '$http', '$timeout', '$location', 'LocalStorageService',
                function ($scope, $http, $timeout, $location, localStorage) {                   
                    var controller = new DeploysheetController($scope, $http, $timeout, $location, mainApp);
            }]);            
            
            mainApp.controller('CookbookController', ['$scope', '$http', '$timeout', '$location', 'LocalStorageService',
                function ($scope, $http, $timeout, $location, localStorage) {                   
                    var controller = new CookbookController($scope, $http, $timeout, $location, mainApp);
            }]);
        }
        
        controllers();
        return controllers;
    }
);
