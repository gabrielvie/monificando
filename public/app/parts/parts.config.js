(function() {
	'use strict';

	function partsRoute($stateProvider) {
		var route = {
			url: '/',
			views: {
				'wrapper': {
					templateUrl: '/app/parts/templates/main.view.html'
				},
				'header@app': {
					templateUrl: '/app/parts/templates/header.view.html',
					controller: 'HeaderController',
					controllerAs: 'headCtrl'
				},
				'sidebar@app': {
					templateUrl: '/app/parts/templates/sidebar.view.html',
					controller: 'SidebarController',
					controllerAs: 'sideCtrl'
				},
				'content-area@app': {
					templateUrl: '/app/parts/templates/content.view.html',
					controller: 'ContentAreaController',
					controllerAs: 'contentCtrl'
				}
			}/*,
			data: {
				displayName: 'Painel Principal',
				displayDescription: 'Seu resumo mensal e estatísticas de gastos.'
			}*/
		};

		$stateProvider.state('app', route);
	}

	partsRoute.$inject = ['$stateProvider'];

	angular
		.module('monificando.parts', ['monificando'])
		.config(partsRoute);

})();
