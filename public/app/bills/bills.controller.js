(function(){
	'use strict';

	angular
		.module('monificando')
		.controller('BillsController', BillsController);

	BillsController.$injector = ['DateService', 'BillsService', '$filter'];

	function BillsController(DateService, BillsService, $filter) {
		var vm = this;
		vm.bills = BillsService.get();

		DateService.setCurrentMonth(vm.bills[0].date);

		vm.monthsList = function () {
			return DateService.months;
		};

		vm.selectMonth = function (month) {
			console.log(month);
		};

		vm.yearsList = function () {
			return null;
		};
	}
})();
