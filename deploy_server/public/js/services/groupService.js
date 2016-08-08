'use strict';

define([
    
], function () {
    
    var GroupService = function(){};
    
    // Static method.
    GroupService.getAll = function($http, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.get( 'api/distribution/instance' ).success( function(data) {
           callback(data);
        });
    };
    
    return GroupService;
});