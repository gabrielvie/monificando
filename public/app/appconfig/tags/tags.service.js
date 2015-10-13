(function() {
	'use strict';

	function TagsService(APIInfoService, $q, $http, $localStorage) {

		var apiUrl = APIInfoService.getAPILink + '/user/' + $localStorage.user_id,
			Tag = {};

		Tag.list = function() {
			var deferred = $q.defer();

			$http
				.get(apiUrl + '/tags')
				.then(function(response) {

					deferred.resolve(response.data);

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
