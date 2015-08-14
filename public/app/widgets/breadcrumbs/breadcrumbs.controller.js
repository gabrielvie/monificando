(function(){
	'use strict';

	angular
		.module('monificando.breadcrumbs')
		.controller('BreadcrumbsController', BreadcrumbsController);

	BreadcrumbsController.$injector = ['$scope', '$state', '$stateParams'];

	function BreadcrumbsController($scope, $state, $stateParams) {
		var vm = this;
		vm.breadcrumbs = [];

		$scope.currentState = $state;

		$scope.$watch('currentState.$current', function(newValue, oldValue) {
			if (newValue.data !== undefined) {
				vm.updateBreadcrumbs(newValue);
			}
		});

		vm.updateBreadcrumbs = function(state) {
			vm.breadcrumbs = [];
			state.path.forEach(function(item){
				vm.breadcrumbs.push(item.self);
			});
		};
	}
})();
