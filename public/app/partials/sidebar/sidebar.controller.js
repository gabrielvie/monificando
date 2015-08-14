(function(){
	'use strict';

	angular
		.module('monificando.partials')
		.controller('SidebarController', SidebarController);

	SidebarController.$injector = ['$scope', '$state', 'SidebarService'];

	function SidebarController($scope, $state, SidebarService) {
		var vm = this;

		vm.menu = SidebarService.menu;
		vm.srefSelected = "";

		$scope.currentState = $state;


		vm.isSelected = function(srefLink) {
			return srefLink === vm.srefSelected;
		};

		$scope.$watch('currentState.$current', function(newValue, oldValue) {
			if (newValue.data !== undefined) {
				vm.srefSelected = newValue.name;
			}
		});
	}
})();
