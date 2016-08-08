'use strict';

define([
    
], function () {

    var EmployeeService = function(){};
    
    // Static methods.
    EmployeeService.getAll = function($http, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }

        $http.get( 'api/distribution/branch' ).success( function(data) {
           callback(data);
        });
    };
    
    EmployeeService.add = function($http, item, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.post( 'api/employees', item ).success( function(data) {
           callback(data);
        });
    };
    
    EmployeeService.update = function($http, item, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.put( 'api/employees', item ).success( function(data) {
           callback(data);
        });
    };
    
    EmployeeService.delete = function($http, id, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.delete( 'api/employees/' + id ).success( function(data) {
           callback(data);
        });
    };
    
    return EmployeeService;
});