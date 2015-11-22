(function(){
	'use strict';

	function CreditCardController(CreditCardService, $modal, $filter, $rootScope) {
		var vm = this;

		vm.creditCardsCollection = [];

		// Open a modal to create a new item
		vm.new = function() {
			var modal = $modal.open({
				animation: true,
				templateUrl: '/app/appconfig/ccredit/templates/new.view.html',
				controller: 'ModalCreditCardController as mCreditCtrl',
				size: '100px',
				resolve: {
					itemId: function() {
						return undefined;
					}
				}
			});
		};

		// Open a request thats retrieve a list of items
		vm.list = function() {

			CreditCardService
				.list()
				.then(function(response) {

					vm.creditCardsCollection = [];

					if (response.list.length > 0) {

						response.list.forEach(function (item){
							vm.creditCardsCollection.push({
								_id: item._id,
								description: item.description,
								buy_day: item.buy_day,
								payment_day: item.payment_day,
								valid_thru: item.valid_thru
							});
						});
					}

				});
		};

		// Open a modal passing an object to edit
		vm.edit = function(obj_id) {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'app/appconfig/ccredit/templates/edit.view.html',
				controller: 'ModalCreditCardController as mCreditCtrl',
				size: '100px',
				resolve: {
					itemId: function() {
						return obj_id;
					}
				}
			});
		};

		$rootScope.$on('updateCreditCardList', function(event, args) {
			vm.list();
		});

		// Starts the controller
		vm.init = function() {
			vm.list();
		};

		vm.init();
	}

	CreditCardController.$inject = ['CreditCardService', '$modal', '$filter', '$rootScope'];


	/* Credit Card Modal Controller to Update and Save */
	function ModalCreditCardController(CreditCardService, $modalInstance, $rootScope, itemId, confirm) {
		var vm = this;

		vm.fields = {};

		vm.init = function() {
			if (itemId !== undefined) {

				CreditCardService
					.get(itemId)
					.then(function(response) {

						vm.fields = response.data;

					});

			}
		};

		vm.create = function() {

			var valid_thru = vm.fields.valid_thru;

			vm.fields.valid_thru = valid_thru.substring(0, 2) + '/' + valid_thru.substring(2);

			var data = vm.fields;

			CreditCardService
				.save(data)
				.then(function(response) {

					$rootScope.$broadcast('updateCreditCardList', {});
					vm.close();

				});
		};

		vm.save = function() {
			var data = vm.fields;

			CreditCardService
				.update(data, item._id)
				.then(function(response) {

					$rootScope.$broadcast('updateCreditCardList', {});
					vm.close();

				});
		};

		vm.remove = function() {

			confirm("Tem certeza disso?").then(function(response) {
				CreditCardService
					.remove(itemId)
					.then(function(response) {

						$rootScope.$broadcast('updateCreditCardList', {});
						vm.close();

					});
			});
		};

		vm.close = function() {
			$modalInstance.dismiss('cancel');
		};

		vm.init();
	}

	ModalCreditCardController.$inject = ['CreditCardService', '$modalInstance', '$rootScope', 'itemId', 'confirm'];

	angular
		.module('monificando.appconfig.ccredit')
		.controller('CreditCardController', CreditCardController)
		.controller('ModalCreditCardController', ModalCreditCardController);
}());
