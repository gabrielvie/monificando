(function(){
	'use strict';

	function BillsController($modal, TagsService, BillService, $rootScope, CreditCardService) {
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

					vm.billsCollection = [];
					vm.billsCollection = response.list;

				});
		};

		vm.edit = function(billId) {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'app/bills/templates/edit.view.html',
				controller: 'EditModalBillController as eMBillCtrl',
				size: '100px',
				resolve: {
					itemId: function() {
						return billId;
					}
				}
			});
		};

		$rootScope.$on('updateBillsList', function(event, args){
			vm.init();
		});

		vm.init = function() {

			vm.billsCollection = [];
			vm.list();

		};

		vm.init();
	}

	BillsController.$inject = ['$modal', 'TagsService', 'BillService', '$rootScope', 'CreditCardService'];

	function ModalBillController(BillsOptionsService, TagsService, CreditCardService, BillService, $scope, $modalInstance, $rootScope) {
		var vm = this;

		vm.fields = {
			repeat: false
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
	  	vm.paymentForm = BillsOptionsService.payment();

	  	vm.loadCreditCards = function() {
	  		CreditCardService
	  			.list()
	  			.then(function(response) {
	  				vm.creditCardsCollection = response.list;
	  			});
	  	};

	  	vm.loadTags = function(query) {
			return TagsService.search(query);
		};

		vm.create = function(form) {

			form.$submitted = true;

			if (form.$valid) {

				var data = angular.copy(vm.fields);

				data.value = data.type === 'credit' ? data.value : data.value * (-1);
				data.date = data.date.toISOString();

				BillService
				 	.save(data)
				 	.then(function(response) {

				 		$rootScope.$broadcast('updateBillsList', {});
				 		vm.close();

				 	});
			}
		};

		vm.init = function() {
			vm.loadCreditCards();
		};

		vm.close = function() {
			$modalInstance.dismiss('cancel');
		};

		vm.init();
	}

	ModalBillController.$inject = ['BillsOptionsService', 'TagsService', 'CreditCardService', 'BillService', '$scope', '$modalInstance', '$rootScope'];


	function EditModalBillController(BillsOptionsService, TagsService, CreditCardService, BillService, $scope, $modalInstance, itemId, $rootScope, confirm) {

		var vm = this;

		vm.fields = {};

		vm.frequencies = BillsOptionsService.frequencies();
	  	vm.paymentForm = BillsOptionsService.payment();

	  	vm.loadCreditCards = function() {
	  		CreditCardService
	  			.list()
	  			.then(function(response) {
	  				vm.creditCardsCollection = response.list;
	  			});
	  	};

		vm.get = function() {

			BillService
				.get(itemId)
				.then(function(response) {

					var data = response.data;

					vm.fields.description 	= data.description;
					vm.fields.value 	 	= data.values[0].value;
					vm.fields.date 			= data.values[0].date;
					vm.fields.payment_form 	= data.payment.form;
					vm.fields.payment_ref 	= data.payment.reference;
					vm.fields.tags 			= data.tags;
					vm.fields.type 			= vm.fields.value > 0 ? 'credit' : 'debit' ;
				});
		};

		vm.calendar = {
			opened: false,
			open: function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				vm.calendar.opened = true;
			}
		};

		vm.update = function () {

			var data = angular.copy(vm.fields);

			BillService
				.update(data, itemId)
				.then(function(response) {

					$rootScope.$broadcast('updateBillsList', {});
					vm.close();

				});

		};

		vm.remove = function() {

			confirm("Tem certeza disso?").then(function(response) {
				BillService
					.remove(itemId)
					.then(function(response){
						$rootScope.$broadcast('updateBillsList', {});
						vm.close();
					});
			});


		};

	  	vm.loadTags = function(query) {
			return TagsService.search(query);
		};

		vm.close = function() {
			$modalInstance.dismiss('cancel');
		};

		vm.init = function() {
			vm.loadCreditCards();
			vm.get();
		};

		vm.init();

	}

	EditModalBillController.$inject = ['BillsOptionsService', 'TagsService', 'CreditCardService', 'BillService', '$scope', '$modalInstance', 'itemId', '$rootScope', 'confirm'];

	angular
		.module('monificando.bills')
		.controller('BillsController', BillsController)
		.controller('ModalBillController', ModalBillController)
		.controller('EditModalBillController', EditModalBillController);
}());
