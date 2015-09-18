/*global angular, console */
(function () {
	'use strict';

	function defaultRoute($urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/auth');
		//$locationProvider.html5Mode(true);
	}

	angular
		.module('monificando', [
			'ui.router',
			'ui.bootstrap',
			'ngStorage',
			'monificando.auth',
			'monificando.parts',
			'monificando.dashboard',
			'monificando.widgets'
		])
		.config(defaultRoute);

}());
