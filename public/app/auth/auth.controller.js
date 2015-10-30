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
			AuthenticationService.signIn(vm.credentials).then(function(response) {
				$state.go('app.dashboard');
			}, function(response) {
				console.log(response);
			});
		};

		vm.signUp = function() {
			AuthenticationService.signUp(vm.newUser).then(function(response) {

				vm.error.message = "";
				vm.error.status = "";

				vm.newUser = {};

				$state.go('auth', {}, { reload: true });

			}, function(response) {

				switch (response.status === 409) {

					case 401:
						vm.error.status = response.w;

						if (response.w === "password") {
							vm.error.message = "Senha incorreta!";
						} else if (response.w === "email") {
							vm.error.message = "Email incorreto!";
						}

						break;
					case 409:
						vm.error.status = "email_already_in_use";
						vm.error.message = "Endereço de email já encontra-se em uso.";
						break;

				}

			});
		};
	}

    AuthController.$inject = ['$state', 'AuthenticationService', '$scope'];

	angular
		.module('monificando.auth')
		.controller('AuthController', AuthController);


}());
