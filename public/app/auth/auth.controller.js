(function(){
	"use strict";

	angular
		.module('monificando.auth')
		.controller('AuthController', AuthController);

	AuthController.$injector = ['$scope'];

	function AuthController($scope) {

	}
})();
