(function(){
	'use strict';

	angular
		.module('monificando.partials')
		.controller('MainController', MainController);

	MainController.$injector = ['$scope', '$state'];

	function MainController($scope, $state) {
		var vm = this;

		$scope.currentState = $state;
		vm.updateMainSectionTitle = function(data) {
			vm.sectionTittle = data.displayName;
			vm.sectionDesc = data.displayDescription;
		};

		$scope.$watch('currentState.$current', function(newValue, oldValue) {
			if (newValue.data !== undefined) {
				vm.updateMainSectionTitle(newValue.data);
			}
		});
	}
})();
