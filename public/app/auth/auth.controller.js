/*global angular, console */
(function () {
	"use strict";

    function AuthController($state, AuthenticationService, $scope) {
		var vm = this;

		vm.crendentials = {
			email: null,
			password: null
		};

		vm.newUser = {};

		vm.calendar = {
			opened: false,
			open: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				vm.calendar.opened = true;
			}
		};

		vm.error = {
			status: null,
			message: null
		};

		$scope.accordion = {
			signin: true,
			signup: false
		};

		vm.signIn = function() {

			var data = angular.copy(vm.credentials)

			AuthenticationService.signIn(data)
				.then(function(response) {

					$state.go('app.dashboard');

				}, function(response) {

					if (response.status === 401) {

						vm.error.status = response.data.w;

						if (vm.error.status === "password") {

							vm.error.message = "Senha incorreta!";

						} else if (vm.error.status === "email") {

							vm.error.message = "Email incorreto!";

						}
					}

				});
		};

		vm.signUp = function() {

			var data = angular.copy(vm.newUser)

			AuthenticationService.signUp(data)
				.then(function(response) {

					vm.error.message = "";
					vm.error.status = "";

					vm.newUser = {};

					$state.go('auth', {}, { reload: true });

				}, function(response) {

					if (response.status === 409) {
						vm.error.status = "email_already_in_use";
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
