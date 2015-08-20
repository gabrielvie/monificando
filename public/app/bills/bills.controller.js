(function(){
	'use strict';

	angular
		.module('monificando')
		.controller('BillsController', BillsController);

	BillsController.$injector = [];

	function BillsController() {
		var vm = this;
		vm.currentMonth = 'Agosto';
	}
})();
