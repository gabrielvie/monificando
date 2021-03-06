/*global angular, console */
(function () {
	"use strict";

	/* Authentication routes */
	function authRoute($stateProvider) {
		var route = {
			url: '/auth',
			views: {
				'wrapper': {
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
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope', function ($q, $location, $localStorage, $rootScope) {

			return {
				'request': function (config) {

					if ($localStorage.user === undefined &&  $localStorage.token === undefined) {
						$location.path('/auth');
					}

					config.headers = config.headers || {};

					if ($localStorage.token) {
						config.headers.token = $localStorage.token;
					}

					return config;
				},
				'responseError': function (response) {
					if (response.status === 401) {
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
