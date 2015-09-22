/*global angular, console */
(function () {
	"use strict";

    function AuthController($state, AuthenticationService, $scope) {
		var vm = this;

		vm.crendentials = {
			email: null,
			password: null
		};

		vm.newUser = {
			first_name: null,
			last_name: null,
			contact: null,
			birthday: null,
			gender: null,
			email: null,
			password: null
		};

		vm.error = {
			status: false,
			message: null
		};

		$scope.accordion = {
			signin: true,
			signup: false
		};

		vm.signIn = function() {
			AuthenticationService.signIn(vm.credentials).then(function(response){
				$state.go('app.dashboard');
			});
		};

		vm.signUp = function() {
			var stringDate = vm.newUser.birthday.replace(/(\d{2})(\d{2})(\d+)/, "$2/$1/$3");
			vm.newUser.birthday = new Date(stringDate).toISOString();

			AuthenticationService.signUp(vm.newUser).then(function(response){

				$scope.accordion = {
					signin: false,
					signup: true
				};

				$state.go('auth', {}, { reload: true });

			}, function(response){
				if (response.status === 409) {
					vm.error.status = true;
					vm.error.message = "Endereço de email já encontra-se em uso.";
				}
			});
		};
	}

    AuthController.$inject = ['$state', 'AuthenticationService', '$scope'];

	angular
		.module('monificando.auth')
		.controller('AuthController', AuthController);


}());
