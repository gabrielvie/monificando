(function() {
	'use strict';

	function AuthenticationService($http, $q, $location, $localStorage, APIInfoService) {

		var apiUrl = APIInfoService.getAPILink;
		var authServiceFactory = {};

		authServiceFactory.signIn = function(credentials) {
			//var data = 'grant_type=password&email=' + credentials.email + '&password=' + credentials.password;
			var data = credentials;

			var deferred = $q.defer();

			$http.post(apiUrl + '/signin', data)
				.then(function(response){
					
					$localStorage.user = response.data.user;
					$localStorage.token = response.data.user.token;

					deferred.resolve(response);

				}, function(error){
					
					authServiceFactory.signOut();
					deferred.reject(error);

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
					deferred.resolve(response);
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
