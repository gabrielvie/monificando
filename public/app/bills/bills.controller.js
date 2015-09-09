(function(){
	'use strict';

	angular
		.module('monificando')
		.controller('BillsController', BillsController);

	BillsController.$injector = ['DateService', 'BillsService', '$modal'];

	function BillsController(DateService, BillsService, $modal) {
		var vm = this;

		vm.monthsList = function () {
			return [];
		};

        vm.open = function () {
			var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'myModalContent.html',
					size: '100px'
				}
			);
		};
	}
})();
