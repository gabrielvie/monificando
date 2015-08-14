/*global angular, console */
(function () {
    'use strict';

    angular
        .module('monificando', [
            'ui.router',
            'monificando.charts',
            'monificando.breadcrumbs',
			'monificando.partials'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

		var app = {
				url: '/app',
				views: {
					'header': {
						templateUrl: '/app/partials/header/header.view.html',
						controller: 'HeaderController',
						controllerAs: 'headCtrl'
					},
					'sidebar': {
						templateUrl: '/app/partials/sidebar/sidebar.view.html',
						controller: 'SidebarController',
						controllerAs: 'sideCtrl'
					},
					'main': {
						templateUrl: '/app/partials/main/main.view.html',
						controller: 'MainController',
						controllerAs: 'mainCtrl'
					},
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
			},
			agenda = {
				url: '/agenda',
				views: {
					'content': {
						templateUrl: '/app/agenda/agenda.view.html'
					}
				},
				data: {
					displayName: 'Minha Agenda',
					displayDescription: ''
				}
			};

		$stateProvider
            .state('app', app)
            .state('app.agenda', agenda);

		$urlRouterProvider.otherwise('/app');
    }

})();
