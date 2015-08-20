(function(){
	'use strict';

	angular
		.module('monificando.dropdown')
		.controller('DropdownController', DropdownController);

	DropdownController.$injector = ['$scope'];

	function DropdownController($scope) {
		var vm = this;

		vm.placeholder = $scope.placeholder;

	}
})();
