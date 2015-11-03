(function(){
	'use strict';

	function CreditCardService(APIInfoService, $q, $http, $localStorage) {
		var apiUrl = APIInfoService.getAPILink + '/user/' + $localStorage.user._id,
			CreditCard = {};

		CreditCard.save = function(data) {
			var deferred = $q.defer();

			$http
				.post(apiUrl + '/creditcards', data)
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		CreditCard.list = function() {
			var deferred = $q.defer();

			$http
				.get(apiUrl + '/creditcards')
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		CreditCard.update = function(data, id) {
			var deferred = $q.defer();

			$http
				.put(apiUrl + '/creditcards/' + id, data)
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		CreditCard.remove = function(id) {
			var deferred = $q.defer();

			$http
				.delete(apiUrl + '/creditcards/' + id)
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		return CreditCard;
	}

	CreditCardService.$inject = ['APIInfoService', '$q', '$http', '$localStorage'];

	angular
		.module('monificando.appconfig.ccredit')
		.factory('CreditCardService', CreditCardService);
		
}());
