(function () {
	'use strict';

	angular
		.module('monificando')
		.factory('BillsService', BillsService);

	BillsService.$injector = [];

	function BillsService() {
		var bills = [];

		return bills;
	}
})();
