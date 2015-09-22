(function(){
	'use strict';

	function billsRoute($stateProvider) {
		var route = {
			url: 'bills',
			views: {
				'content': {
					templateUrl: '/app/bills/bills.view.html',
					controller: 'BillsController',
					controllerAs: 'billCtrl'
				}
			},
			data: {
				displayName: 'Meus Lançamentos',
				displayDescription: ''
			}
		};

		$stateProvider.state('app.bills', route);
	}

	billsRoute.$inject = ['$stateProvider'];

	angular
		.module('monificando.bills', ['monificando'])
		.config(billsRoute);
}());
