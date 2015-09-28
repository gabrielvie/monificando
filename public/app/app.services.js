/*global angular, console */
(function () {
	'use strict';

	function APIInfoService($location) {
		this.getAPILink = $location.protocol() + '://' + $location.host() + '/api';

		this.getFullAPILink = function($uri) {
			return this.getAPILink + $uri;
		};
	}

	angular
		.module('monificando')
		.service('APIInfoService', APIInfoService);
}());
