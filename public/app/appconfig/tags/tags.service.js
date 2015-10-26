(function() {
	'use strict';

	function TagsService(APIInfoService, $q, $http, $localStorage) {

		var apiUrl = APIInfoService.getAPILink + '/user/' + $localStorage.user._id,
			Tag = {};

		Tag.save = function(data) {
			var deferred = $q.defer();

			$http
				.post(apiUrl + '/tags', data)
				.then(function(response) {

					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		Tag.get = function(query) {
			var deferred = $q.defer();

			$http
				.get(apiUrl + '/tags/' + query)
				.then(function(response) {
					console.log(response);
					deferred.resolve(response.data);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		Tag.search = function(query) {
			var deferred = $q.defer();

			$http
				.get(apiUrl + '/tags/' + query, { cache: true })
				.then(function(response) {
					var responseList = response.data.list;

					deferred.resolve(responseList);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		return Tag;
	}

	TagsService.$inject = ['APIInfoService', '$q', '$http', '$localStorage'];

	angular
		.module('monificando.appconfig.tags')
		.factory('TagsService', TagsService);
}());
