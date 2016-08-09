'use strict';

define([
    
], function () {
    
    var DeploysheetService = function(){};
    
    // Static method.
    DeploysheetService.getAll = function($http, callback) {
        if (typeof (callback) !== 'function') {
            throw new Error('Argument \'callback\' is not a function.');
        }
        
        $http.get( 'api/deploysheet/instance' ).success( function(data) {
           callback(data);
        });
    };
    
    return DeploysheetService;
});