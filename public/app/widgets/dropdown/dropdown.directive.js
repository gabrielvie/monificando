(function(){
	'use strict';

	angular
		.module('monificando.dropdown')
		.directive('dropdown', dropdown);

	dropdown.$injector = [];

	function dropdown() {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				placeholder: "="
			},
			templateUrl: 'app/widgets/dropdown/dropdown.view.html',
			controller: 'DropdownController',
			controllerAs: 'dropdown'
		};
	}

})();
