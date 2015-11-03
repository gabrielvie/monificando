(function(){
	'use strict';

	function BillsController($modal, TagsService, BillService, $rootScope) {
		var vm = this;

		vm.billsCollection = [];

		vm.new = function() {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'app/bills/templates/new.view.html',
				controller: 'ModalBillController as mBillCtrl',
				size: '100px'
			});
		};

		vm.list = function() {

			BillService
				.list()
				.then(function(response) {

					var now = new Date();

					vm.billsCollection = [];

					response.list.forEach(function(item) {

						var queryTags = '';

						item.tags.forEach(function(tag, index) {
							queryTags += index === 0 ? "ids[]=" + tag : "&ids[]=" + tag;
						});

						TagsService
							.get(queryTags)
							.then(function(response) {
								item.tags = response.list;
							});

						item.values.forEach(function(value, index) {

							var valueDate = new Date(value.date),
								pseudoItem = item;

							if (valueDate.getMonth() === now.getMonth()) {
								
								if (item.values.length > 1) {
									var sufixBill = (" " + (index + 1) + ("/" + item.values.length));
									pseudoItem.description = pseudoItem.description + sufixBill;
								}
								
								pseudoItem.value = value.value;
								pseudoItem.date = value.date;
								pseudoItem.paid = value.paid;
								pseudoItem.valueId = value._id;

								delete pseudoItem.values;


								vm.billsCollection.push(pseudoItem);
							}

						});

					});

				});

		};

		$rootScope.$on('updateBillsList', function(event, args){
			vm.list();
		});

		vm.init = function() {
			vm.list();
		};

		vm.init();
	}

	BillsController.$inject = ['$modal', 'TagsService', 'BillService', '$rootScope'];

	function ModalBillController(BillsOptionsService, TagsService, CreditCardService, BillService, $scope, $modalInstance, $rootScope) {
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

	  	vm.loadTags = function(query) {
			return TagsService.search(query);
		};

		vm.create = function(){
			var nBill = {
					description: vm.fields.description,
					payment_options: vm.fields.paymentForm,
					payment_ref: vm.fields.paymentReference,
					period: vm.fields.hasFrequency === false ? null : vm.fields.frequency,
					repeat: vm.fields.hasFrequency === false ? 'no_repeat' : vm.fields.freqType,
					tags: [],
					value: vm.fields.type === 'credit' ? vm.fields.value : vm.fields.value * (-1),
					date: vm.fields.date.toISOString(),
					qty: vm.fields.freqQty
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

			BillService
				.save(nBill)
				.then(function(response) {

					$rootScope.$broadcast('updateBillsList', {});
					vm.close();

				});
		};

		vm.close = function() {
			$modalInstance.dismiss('cancel');
		};
	}

	ModalBillController.$inject = ['BillsOptionsService', 'TagsService', 'CreditCardService', 'BillService', '$scope', '$modalInstance', '$rootScope'];

	angular
		.module('monificando.bills')
		.controller('BillsController', BillsController)
		.controller('ModalBillController', ModalBillController);
}());
