/*global angular, console */
(function () {
	"use strict";

    function AuthController($scope) {
		var vm = this;

		vm.login = function () {
			var credentials = {
				email: vm.email,
				password: vm.password
			};
			console.log(credentials);
		};
	}

    AuthController.$injector = ['$scope'];

	angular
		.module('monificando.auth')
		.controller('AuthController', AuthController);


}());
