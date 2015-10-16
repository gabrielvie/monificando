(function(){
	'use strict';

	function BillsOptionsService() {
		var Options = {};

		Options.frequencies = function() {
			return [
				{ value: 'weekly', 	 	display: 'Semanal' },
				{ value: 'biweekly', 	display: 'Quinzenal' },
				{ value: 'monthly',  	display: 'Mensal', selected: true },
				{ value: 'bimonthly', 	display: 'Bimestral' },
				{ value: 'quarterly', 	display: 'Trimestral' },
				{ value: 'semiannual', 	display: 'Semestral' },
				{ value: 'annual', 		display: 'Anual' }
			];
		};

		Options.frequenciesRepeat = function() {
			return [
				{ value: 'no_prev', 	display: 'Sem Previsões', selected: true },
				{ value: 'repeat', 		display: 'Repetido' },
				{ value: 'divided', 	display: 'Parcelado' }
			];
		};

		Options.payment = function() {
			return [
				{ value: null, 			display: 'Forma de Pagamento', selected: true },
				{ value: 'money', 		display: 'Dinheiro' },
				//{ value: 'debit', 		display: 'Débito em Conta' },
				{ value: 'credit', 		display: 'Cartão de Crédito' }
			];
		};

		return Options;
	}

	BillsOptionsService.$inject = [];

	angular
		.module('monificando.bills')
		.factory('BillsOptionsService', BillsOptionsService);

}());
