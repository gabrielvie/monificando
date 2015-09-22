/*global angular, console */
(function () {
	"use strict";

	/* Authentication routes */
	function authRoute($stateProvider) {
		var route = {
			url: '/auth',
			views: {
				'main': {
					templateUrl: '/app/auth/auth.view.html',
					controller: 'AuthController',
					controllerAs: 'authCtrl'
				}
			}
		};

		$stateProvider.state('auth', route);
	}

	authRoute.$inject = ['$stateProvider'];

	/* Interceptors */
	function authConfiguration($httpProvider) {
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$timeout', function ($q, $location, $localStorage, $timeout) {

			return {
				'request': function (config) {
					config.headers = config.headers || {};
					if ($localStorage.token) {
						config.headers.token = $localStorage.token;
					}

					return config;
				},
				'responseError': function (response) {
					$location.path('/auth');

					return $q.reject(response);
				}
			};
		}]);
	}

	authConfiguration.$inject = ['$httpProvider'];

	angular
		.module('monificando.auth', ['monificando'])
		.config(authRoute)
		.config(authConfiguration);
}());
