(function(){
	'use strict';

	angular
		.module('monificando')
		.factory('BillsService', BillsService);

	BillsService.$injector = [];

	function BillsService() {
		var bills = [];

		bills.get = function() {
			var result = [];

			result.push({
				'title': "Mixer Eletrolux",
				'description': "Mixer comprado na eletrolux.",
				'value': '',
				'date': new Date("2015-06-19 19:55:00")
			});

			result.push({
				'title': "Eletropaulo",
				'description': "Conta de Luz",
				'value': '',
				'date': new Date("2015-06-10 15:40:00")
			});

			return result;
		};



		return bills;
	}
})();
