(function(){
	'use strict';

	function BillsController($modal) {
		var vm = this;

		vm.new = function() {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'new-modal.html',
				size: '100px'
			});
		};
	}

	BillsController.$inject = ['$modal'];

	angular
		.module('monificando')
		.controller('BillsController', BillsController);
}());
