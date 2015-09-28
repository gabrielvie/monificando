/*global angular, console */
(function () {
	'use strict';

	/* Deafult app's route */
	function defaultRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/auth');
	}

	defaultRoute.$inject = ['$urlRouterProvider'];

	angular
		.module('monificando', [
			'ui.router',
			'ui.bootstrap',
			'ui.mask',
			'ngStorage',
			'monificando.auth',
			'monificando.appconfig',
			'monificando.parts',
			'monificando.dashboard',
			'monificando.bills',
			'monificando.widgets'
		])
		.config(defaultRoute);

}());
