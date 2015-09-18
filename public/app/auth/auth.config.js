/*global angular, console */
(function () {
	"use strict";

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

	function authConfiguration($httpProvider) {

		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
			return {
				'request': function (config) {
					config.headers = config.headers || {};
					if ($localStorage.token) {
						config.headers.token = $localStorage.token;
					}

					return config;
				},
				'responseError': function (response) {
					if (response.status === 401 || response.status === 403) {
						$location.path('/auth');
					}

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
