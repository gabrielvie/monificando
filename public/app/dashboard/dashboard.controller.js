/*global angular, console */
(function () {
    'use strict';

	function DashboardController(DashboardService) {
		var vm = this;
		vm.lineChart = {
			data: [],
			labels: []
		};

		vm.pieChart = {
			labels: [],
			series: [],
			data: []
		};

		vm.cards = {};

		vm.loadPieChartData = function() {

			DashboardService
				.getBillsByMonths(3)
				.then(function(response) {
					vm.pieChart.data 	= response.data;
					vm.pieChart.labels  = response.labels;
					vm.pieChart.series	= response.labels;
				});

		};

		vm.loadLineChartData = function() {

			DashboardService
				.getBillsFromThisMonth()
				.then(function(response) {

					vm.lineChart.labels	 = response.labels;
					vm.lineChart.data[0] = response.data;

				});

		};

		vm.loadCardsData = function() {

			DashboardService
				.getCreditCardsBill()
				.then(function(response) {

					for (var prop in response) {
						vm.cards[prop] = {
							value: response[prop]
						};
					}

				});
		};

		vm.init = function() {
			vm.loadCardsData();
			vm.loadLineChartData();
			vm.loadPieChartData();
		};

		vm.init();
	}

	DashboardController.$inject = ['DashboardService'];

    angular
        .module('monificando.dashboard')
        .controller('DashboardController', DashboardController);

})();
