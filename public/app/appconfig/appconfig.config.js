(function(){
	'use strict';

	function appconfigRoute($stateProvider) {
		var route = {
			url: 'config',
			views: {
				'content': {
					templateUrl: '/app/appconfig/appconfig.view.html',
					controller: 'AppConfigController',
					controllerAs: 'appconfCtrl'
				}
			},
			data: {
				displayName: 'Configurações',
				displayDescription: ''
			}
		};

		$stateProvider.state('app.config', route);
	}

	appconfigRoute.$inject = ['$stateProvider'];

	angular
		.module('monificando.appconfig', [
			'monificando',
			'monificando.appconfig.ccredit',
			'monificando.appconfig.tags'
		])
		.config(appconfigRoute);

}());
