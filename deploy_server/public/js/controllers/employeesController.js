'use strict';

define([
    'services/employeeService'
], function (EmployeeService) {

    function EmployeesController($scope, $http, $timeout, $location ) {
        if (!$scope) {
            throw new Error('Argument $scope is invalid.');
        }
        if (!$http) {
            throw new Error('Argument $http is invalid.');
        }
             
        // init
        $scope.activeItem = {};
        $scope.employees = {};
        $scope.orderProp = 'name';
        
        // getAll by dep_id
        EmployeeService.getAll($http, $scope.auth.dep_id, function(data) {
            $scope.employees = data;
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
                EmployeeService.update($http, item, function(data) {
                    console.log('commitEdit:' + data.result);
                });
            }
            else {
                // commitAdd               
                item.dep_id = $scope.auth.dep_id;
                EmployeeService.add($http, item, function(data) {
                    console.log('commitAdd:' + data.id);
                    $scope.employees.push(data);
                });
            }
            
            $('#modal_edit').modal('hide');
        };
        
        // delete
        $scope.delete = function(item) {
            var deletePos = $.inArray(item, $scope.employees);
            if(deletePos > -1) {
                EmployeeService.delete($http, item.id, function(data) {
                    console.log('delete:' + data.result);
                    if(data.result) {
                        $scope.employees.splice(deletePos, 1);
                    }
                });
            } 
        };
  
    }
    
    return EmployeesController;
});