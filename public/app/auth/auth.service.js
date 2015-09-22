(function() {
	'use strict';

	function AuthenticationService($http, $q, $location, $localStorage, APIInfoService) {

		var apiUrl = APIInfoService.getAPILink;
		var authServiceFactory = {};

		authServiceFactory.authentication = {
			isAuth: false,
			username: ""
		};

		authServiceFactory.signIn = function(credentials) {
			var data = 'grant_type=password&email=' + credentials.email + '&password=' + credentials.password;
			var deferred = $q.defer();

			$http.post(apiUrl + '/signin', data, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response){
				$localStorage.token = response.data.token;
				$localStorage.user = response.data.user;

				deferred.resolve(response);
			}, function(error){
				authServiceFactory.signOut();
				deferred.reject(error.data);
			});

			return deferred.promise;
		};

		authServiceFactory.signOut = function(){
			delete $localStorage.token;
			delete $localStorage.user;

			$location.path('/auth');
		};

		authServiceFactory.signUp = function(data) {
			var deferred = $q.defer();

			$http.post(apiUrl + '/signup', data)
				.then(function(response){
				}, function(error){
					deferred.reject(error);
				});

			return deferred.promise;
		};

		return authServiceFactory;
	}

	AuthenticationService.$inject = ['$http', '$q', '$location', '$localStorage', 'APIInfoService'];

	angular
		.module('monificando.auth')
		.factory('AuthenticationService', AuthenticationService);
}());
