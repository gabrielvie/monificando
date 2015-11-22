/*global angular, console */
(function () {
	'use strict';

	function APIInfoService($location, $localStorage) {
		this.getAPILink = $location.protocol() + '://' + $location.host() + '/api';

		this.getFullAPILink = function($uri) {
			return this.getAPILink + $uri;
		};

		this.getAPIUserLink = function() {
			if ($localStorage.user._id !== undefined) {

				return this.getAPILink + "/user/" + $localStorage.user._id;

			} else {

				return null;

			}
		};
	}

	APIInfoService.$inject = ['$location', '$localStorage'];

	angular
		.module('monificando')
		.service('APIInfoService', APIInfoService);
}());
