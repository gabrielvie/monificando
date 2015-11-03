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
				{ value: 'installment',	display: 'Parcelado' }
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


	function BillService(APIInfoService, $q, $http, $localStorage) {
		var apiUrl = APIInfoService.getAPILink + '/user/' + $localStorage.user._id,
			Bill 	= {};

		Bill.save = function(data) {
			var deferred = $q.defer();

			$http
				.post(apiUrl + '/bills', data)
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		Bill.list = function() {
			var deferred = $q.defer();

			$http
				.get(apiUrl + '/bills')
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(response.data);

				});

			return deferred.promise;
		};

		return Bill;
	}

	BillService.$inject = ['APIInfoService', '$q', '$http', '$localStorage'];

	angular
		.module('monificando.bills')
		.factory('BillsOptionsService', BillsOptionsService)
		.factory('BillService', BillService);

}());
