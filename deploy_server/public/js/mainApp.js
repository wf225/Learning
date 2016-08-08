'use strict';

define([ 'angular'
       , 'angular_route'
       , 'services/localStorage'
], function (angular, angular_route, LocalStorageService) {
    
    var app = angular
        .module('mainApp', ['ngRoute', LocalStorageService]);
    
    app.init = function() {
        angular.bootstrap(document, ['mainApp']);
    };    
    
    return app;
});
