(function(){
	'use strict';

	angular
		.module('monificando.dropdown', [])
		.run(function($rootScope){
			angular.element(document).on("click", function(e) {
				$rootScope.$broadcast("documentClicked", angular.element(e.target));
			});
		});
})();
