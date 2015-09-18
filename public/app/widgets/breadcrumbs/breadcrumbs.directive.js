(function () {
	'use strict';

	breadcrumbs.$injector = ['$log', '$parse', '$interpolate'];

	function breadcrumbs($log, $parse, $interpolate){
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/widgets/breadcrumbs/breadcrumbs.view.html',
			controller: 'BreadcrumbsController',
			controllerAs: 'bread'
		};
	}

	angular
		.module('monificando.widgets.breadcrumbs')
        .directive('breadcrumbs', breadcrumbs);

})();
