(function(){
	'use strict';

	angular
		.module('monificando')
		.factory('billsService', billsService);

	billsService.$injector = [];

	function billsService() {
		var bills = [];

		bills.push({
			'title': "Mixer Eletrolux",
			'description': "Mixer comprado na eletrolux.",
			'date': "2015/06/19"
		});

		bills.push({
			'title': "Eletropaulo",
			'description': "Conta de Luz",
			'date': "2015/06/10"
		});

		return bills;
	}
})();
