(function(){
	'use strict';

	function BillsController($modal, TagsService) {
		var vm = this;

		vm.new = function() {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'app/bills/templates/new.view.html',
				controller: 'ModalBillController as mBillCtrl',
				size: '100px'
			});
		};
	}

	BillsController.$inject = ['$modal', 'TagsService'];

	function ModalBillController(BillsOptionsService, TagsService, CreditCardService, $scope) {
		var vm = this;

		vm.fields = {
			type: 'credit',
			description: null,
			value: null,
			date: null,
		  	tags: null,
			hasFrequency: false,
			paymentForm: 'money',
			frequency: 'monthly',
			freqType: 'no_prev',
			freqQty: 1
		};

		vm.calendar = {
			opened: false,
			open: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				vm.calendar.opened = true;
			}
		};


		vm.frequencies = BillsOptionsService.frequencies();
	  	vm.freqRepeats = BillsOptionsService.frequenciesRepeat();
	  	vm.paymentOptions = BillsOptionsService.payment();
		//vm.reference = CreditCardService.list();

	  	vm.loadTags = function(query) {
			return TagsService.search(query);
		};

		vm.create = function(){
			console.log(vm.fields);
		};

	}

	ModalBillController.$inject = ['BillsOptionsService', 'TagsService', 'CreditCardService', '$scope'];

	angular
		.module('monificando.bills')
		.controller('BillsController', BillsController)
		.controller('ModalBillController', ModalBillController);
}());
