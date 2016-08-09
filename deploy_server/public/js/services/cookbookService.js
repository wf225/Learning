'use strict';

define([
    
], function () {

    var CookbookService = function(){};
    
    // Static methods.
    CookbookService.getAll = function($http, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }

        $http.get( 'api/deploysheet/branch' ).success( function(data) {
           callback(data);
        });
    };
    
    CookbookService.add = function($http, item, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.post( 'api/deploysheet', item ).success( function(data) {
           callback(data);
        });
    };
    
    CookbookService.update = function($http, item, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.put( 'api/deploysheet', item ).success( function(data) {
           callback(data);
        });
    };
    
    CookbookService.delete = function($http, id, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.delete( 'api/deploysheet/' + id ).success( function(data) {
           callback(data);
        });
    };
    
    return CookbookService;
});