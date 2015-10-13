/*global angular, console */
(function () {
	'use strict';

	/* Deafult app's route */
	function defaultRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/auth');
	}

	defaultRoute.$inject = ['$urlRouterProvider'];


	/* AppControler to manager application */
	function AppController($scope, $state) {

		$scope.isLogged = function() {
			if ($state.current.url === '/auth') {
				return false;
			} else {
				return true;
			}
		};
	}

	AppController.$inject = ['$scope', '$state'];

	angular
		.module('monificando', [
			'ui.router',
			'ui.bootstrap',
			'ui.mask',
			'ngStorage',
			'ngTagsInput',
			'monificando.filters',
			'monificando.auth',
			'monificando.appconfig',
			'monificando.parts',
			'monificando.dashboard',
			'monificando.bills',
			'monificando.widgets'
		])
		.controller('AppController', AppController)
		.config(defaultRoute);

}());
