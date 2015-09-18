(function() {
	'use strict';

	function dashboardRoute($stateProvider) {
		var route = {
			url: 'dashboard',
			views: {
				'content@app': {
					templateUrl: '/app/dashboard/dashboard.view.html',
					controller: 'DashboardController',
					controllerAs: 'dashCtrl'
				}
			},
			data: {
				displayName: 'Painel Principal',
				displayDescription: 'Seu resumo mensal e estatísticas de gastos.'
			}
		};

		$stateProvider.state('app.dashboard', route);
	}

	dashboardRoute.$inject = ['$stateProvider'];

	angular
		.module('monificando.dashboard', ['monificando'])
		.config(dashboardRoute);
})();
