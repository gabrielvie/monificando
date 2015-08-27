(function(){
	'use strict';

	angular
		.module('monificando.dropdown')
		.controller('DropdownController', DropdownController);

	DropdownController.$injector = ['$scope'];

	function DropdownController($scope) {
		var vm = this;

		vm.itemsList = $scope.itemsList;

		vm.getSelectedItem = function() {

			for (var i = 0;  i < vm.itemsList.length; i++) {
				if (vm.itemsList[i].current) {
					return vm.itemsList[i].name;
				}
			}
		};

		vm.selectItem = function(itemNumber) {

			for (var i = 0; i < vm.itemsList.length; i++) {
				if (vm.itemsList[i].current) {
					vm.itemsList[i].current = false;
				}
			}

			vm.itemsList[itemNumber - 1].current = true;
		};
	}
})();
