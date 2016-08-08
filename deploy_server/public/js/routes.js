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
            .when('/groups', {
                templateUrl: 'views/groups.html',
                controller: 'GroupsController'
            })
            .when('/employees', {
                templateUrl: 'views/employees.html',
                controller: 'EmployeesController'
            })
            .otherwise({
                //redirectTo: '/dashboard'
                templateUrl: './views/dashboard.html',
                controller: 'DashboardController'
            });
    }]);
});
