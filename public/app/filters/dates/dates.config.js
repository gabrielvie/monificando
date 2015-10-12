(function () {
	'use strict';

	function daysRemaining() {
		return function(day) {
			var today = new Date(),
				next = null;

			if (today.getDate() > day || today.getDate !== day) {
				next = new Date(today.getFullYear(), today.getMonth() + 1, day);
			} else if (today.getDate() < day || today.getDate !== day) {
				next = new Date(today.getFullYear(), today.getMonth(), day);
			} else {
				return 0;
			}

			return Math.round(( next - today ) / (1000*60*60*24));
		};
	}

	daysRemaining.$inject = [];


	angular
		.module('monificando.filters.dates', [
			'monificando.filters'
		])
		.filter('daysRemaining', daysRemaining);
}());
