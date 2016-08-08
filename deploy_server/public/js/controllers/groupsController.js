'use strict';

define([
    'services/groupService'
], function (GroupService) {

    function GroupsController($scope, $http, $timeout, $location ) {
        if (!$scope) {
            throw new Error('Argument $scope is invalid.');
        }
        if (!$http) {
            throw new Error('Argument $http is invalid.');
        }
        
        // getAll by dep_id
        GroupService.getAll($http, function(data) {
            $scope.instanceList = data;
        });
  
    }
    
    return GroupsController;
});