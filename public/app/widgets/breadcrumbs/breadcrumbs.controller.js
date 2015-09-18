(function(){
	'use strict';

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

	BreadcrumbsController.$injector = ['$scope', '$state', '$stateParams'];

	angular
		.module('monificando.widgets.breadcrumbs')
		.controller('BreadcrumbsController', BreadcrumbsController);
})();
