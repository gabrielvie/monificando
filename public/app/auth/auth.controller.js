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

		vm.emptyForm = {
			first_name: "",
			last_name: "",
			contact: "",
			birthday: null,
			gender: "",
			email: "",
			password: ""
		};

		vm.calendar = {
			opened: false,
			open: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				vm.calendar.opened = true;
			}
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
			AuthenticationService.signIn(vm.credentials).then(function(response) {
				$state.go('app.dashboard');
			}, function(response) {
				console.log(response);
			});
		};

		vm.signUp = function() {
			AuthenticationService.signUp(vm.newUser).then(function(response) {

				vm.newUser = vm.emptyForm;
				$scope.signupForm.$setPristine();

				$state.go('auth', {}, { reload: true });

			}, function(response) {
				console.log(response);
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
