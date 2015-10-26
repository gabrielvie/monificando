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
			var nBill = {
					description: vm.fields.description,
					total: vm.fields.type === 'credit' ? vm.fields.value : vm.fields.value * (-1),
					date: vm.fields.date.toISOString(),
					payment_options: vm.fields.paymentForm,
					payment_ref: vm.fields.paymentReference,
					period: vm.fields.frequency,
					repeat: !vm.fields.hasFrequency ? 'no_repeat' : vm.fields.freqType,
					qty: vm.fields.freqQty,
					tags: []
				};

			vm.fields.tags.forEach(function(tag, idx) {
				if (tag._id === undefined) {
					TagsService
						.save(tag)
						.then(function(response) {
							nBill.tags.push(response.data._id);
						});
				} else {
					nBill.tags.push(tag._id);
				}
			});


			console.log('before: ', vm.fields);
			console.log('after: ', nBill);
		};

	}

	ModalBillController.$inject = ['BillsOptionsService', 'TagsService', 'CreditCardService', '$scope'];

	angular
		.module('monificando.bills')
		.controller('BillsController', BillsController)
		.controller('ModalBillController', ModalBillController);
}());
