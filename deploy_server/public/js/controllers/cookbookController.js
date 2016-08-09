'use strict';

define([
    'services/cookbookService'
], function (CookbookService) {

    function CookbookController($scope, $http, $timeout, $location ) {
        if (!$scope) {
            throw new Error('Argument $scope is invalid.');
        }
        if (!$http) {
            throw new Error('Argument $http is invalid.');
        }
             
        // init
        // $scope.activeItem = {};
        // $scope.cookbooks = {};
        // $scope.orderProp = 'name';
        
        // getAll by dep_id
        CookbookService.getAll($http, function(data) {
            $scope.branchList = data;
        });
        
        // beginAdd
        $scope.beginAdd = function() {
            $scope.activeItem = {}; // init a activeItem.        
            $('#modal_edit').modal({ keyboard: true });           
        };
        
        // beginEdit
        $scope.beginEdit = function(item) {
            $scope.activeItem = item; // set activeItem.            
            $('#modal_edit').modal({ keyboard: true });           
        };
        
        // commit Edit/Add
        $scope.commit = function(item) {
            if(item.id) {
                // commitEdit
                CookbookService.update($http, item, function(data) {
                    console.log('commitEdit:' + data.result);
                });
            }
            else {
                // commitAdd               
                item.dep_id = $scope.auth.dep_id;
                CookbookService.add($http, item, function(data) {
                    console.log('commitAdd:' + data.id);
                    $scope.cookbooks.push(data);
                });
            }
            
            $('#modal_edit').modal('hide');
        };
        
        // delete
        $scope.delete = function(item) {
            var deletePos = $.inArray(item, $scope.cookbooks);
            if(deletePos > -1) {
                CookbookService.delete($http, item.id, function(data) {
                    console.log('delete:' + data.result);
                    if(data.result) {
                        $scope.cookbooks.splice(deletePos, 1);
                    }
                });
            } 
        };
  
    }
    
    return CookbookController;
});