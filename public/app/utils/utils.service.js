(function () {
	'use strict';

	function confirm($q, $window) {

		return function(message) {

			var defer = $q.defer();

			if ($window.confirm(message)) {
				defer.resolve(true);
			} else {
				defer.reject(false);
			}

			return defer.promise;
		};

	}

	confirm.$inject = ['$q', '$window'];

	function alert($q, $window) {

		return function(message) {
			var defer = $q.defer();

			$window.alert(message);

			defer.resolve();

			return defer.promise;
		};
	}

	alert.$inject = ['$q', '$window'];

	angular
		.module('monificando.utils')
		.factory('confirm', confirm)
		.factory('alert', alert);
}());
