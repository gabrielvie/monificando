/*global angular, console */
(function () {
	'use strict';

	function APIInfoService($location) {
		this.getAPILink = $location.protocol() + '://api.' + $location.host();

		this.getFullAPILink = function($uri) {
			return this.getAPILink + $uri;
		};
	}

	angular
		.module('monificando')
		.service('APIInfoService', APIInfoService);
}());
