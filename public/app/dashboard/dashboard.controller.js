/*global angular, console */
(function () {
    'use strict';

	function DashboardController($http, APIInfoService) {
		var vm = this;
		vm.lineChart = {};
		vm.pieChart = {};

		vm.lineChart.labels = ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4','Dia 5', 'Dia 6', 'Dia 7', 'Dia 8', 'Dia 9'];
		vm.lineChart.data = [[8, 3.5, 15, 22, 20, 3, 19, 16]];

		vm.pieChart.labels = ['Janeiro', 'Fevereiro', 'Março'];
		vm.pieChart.series = ['Janeiro', 'Fevereiro', 'Março'];
		vm.pieChart.data = [1150.59, 2312.40, 1640.34];

		$http.get(APIInfoService.getFullAPILink('/me'))
			.then(function(response) {
			}, function(response) {
				console.log(response);
			});
	}

	DashboardController.$inject = ['$http', 'APIInfoService'];

    angular
        .module('monificando.dashboard')
        .controller('DashboardController', DashboardController);

})();
