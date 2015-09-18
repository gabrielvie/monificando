(function() {
	'use strict';

	function partsRoute($stateProvider) {
		var route = {
			url: '/',
			views: {
				'header': {
					templateUrl: '/app/parts/templates/header.view.html',
					controller: 'HeaderController',
					controllerAs: 'headCtrl'
				},
				'sidebar': {
					templateUrl: '/app/parts/templates/sidebar.view.html',
					controller: 'SidebarController',
					controllerAs: 'sideCtrl'
				},
				'main': {
					templateUrl: '/app/parts/templates/main.view.html',
					controller: 'ContentAreaController',
					controllerAs: 'mainCtrl'
				}
			},
			data: {
				displayName: 'Painel Principal',
				displayDescription: 'Seu resumo mensal e estatísticas de gastos.'
			}
		};

		$stateProvider.state('app', route);
	}

	partsRoute.$inject = ['$stateProvider'];

	angular
		.module('monificando.parts', ['monificando'])
		.config(partsRoute);

})();
