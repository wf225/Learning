/*global define*/
'use strict';

/**
 * Services that persists and retrieves from localStorage.
 */ 
define([
	'angular'
], function (angular) {
	var moduleName = 'LocalStorageModule';
	angular
		.module(moduleName, [])
		.factory('LocalStorageService', function () {
			var STORAGE_ID = 'LocalStorage-Service';

			return {
				get: function () {
					return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
				},

				put: function (todos) {
					localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
				}
			};
		});
	return moduleName;
});
