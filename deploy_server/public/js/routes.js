'use strict';

define([
    'mainApp', 
    'controllers/controllers'
], function (mainApp) {
    return mainApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/deploysheet', {
                templateUrl: 'views/deploysheet.html',
                controller: 'DeploysheetController'
            })
            .when('/cookbook', {
                templateUrl: 'views/cookbook.html',
                controller: 'CookbookController'
            })
            .otherwise({
                //redirectTo: '/dashboard'
                templateUrl: './views/dashboard.html',
                controller: 'DashboardController'
            });
    }]);
});
