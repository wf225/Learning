'use strict';

define([
    'services/deploysheetService'
], function (DeploysheetService) {

    function DeploysheetController($scope, $http, $timeout, $location ) {
        if (!$scope) {
            throw new Error('Argument $scope is invalid.');
        }
        if (!$http) {
            throw new Error('Argument $http is invalid.');
        }
        
        DeploysheetService.getAll($http, function(data) {
            $scope.instanceList = data;
        });
  
    }
    
    return DeploysheetController;
});