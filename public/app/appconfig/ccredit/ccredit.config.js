(function(){
	'use strict';

	function ccreditRoute($stateProvider) {
		var route = {
			url: '/creditcards',
			views: {
				'content@app': {
					templateUrl: '/app/appconfig/ccredit/templates/ccredit.view.html',
					controller: 'CreditCardController',
					controllerAs: 'creditCtrl'
				}
			},
			data: {
				displayName: 'Cartões de Crédito',
				displayDescription: 'Gerencie seus cartões de crédito'
			}
		};

		$stateProvider.state('app.config.credit', route);
	}

	ccreditRoute.$inject = ['$stateProvider'];

	angular
		.module('monificando.appconfig.ccredit', ['monificando.appconfig'])
		.config(ccreditRoute);
}());
