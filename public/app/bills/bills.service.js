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

		Options.payment = function() {
			return [
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

		Bill.get = function(id) {
			var deferred = $q.defer();

			$http
				.get(apiUrl + '/bills/' + id)
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

		Bill.update = function(data, id) {
			var deferred = $q.defer();

			for (var i in data.tags) {
				data.tags[i] = data.tags[i]._id;
			}

			$http
				.put(apiUrl + '/bills/' + id, data)
				.then(function(response) {
					console.log('ok', response);
					deferred.resolve(response.data);

				}, function(error) {
					console.log('nao ok', error);

					deferred.reject(error.data);

				});

			return deferred.promise;
		};

		Bill.remove = function(id) {
			var deferred = $q.defer();

			$http
				.delete(apiUrl + '/bills/' + id)
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

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
