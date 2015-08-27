(function(){
	'use strict';

	angular
		.module('monificando.dropdown')
		.directive('dropdown', dropdown);

	dropdown.$injector = ['$rootScope'];

	function dropdown($rootScope) {
		return {
			restrict: 'EA',
			replace: false,
			scope: {
				placeholder: "=",
				itemsList: "=",
				callbackMethod: "&"
			},
			templateUrl: 'app/widgets/dropdown/dropdown.view.html',
			controller: 'DropdownController',
			controllerAs: 'dropdCtrl',
			link: function(scope, element, attributes) {
				//console.log(scope);
				//console.log(element);
				//console.log(attributes);
				$rootScope.$on("documentClicked", function (inner, target) {
					console.log(target);

					if (target[0].className === "dropdown__display") {
						//target[0].className = "dropdown--clicked";
					}
					var node = element[0].children[0];
					//node.className += " show";
				});
			}
		};
	}

})();
