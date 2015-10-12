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
					item: function() {
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

				}, function(error) {
					console.log(response);
				});
		};

		// Open a modal passing an object to edit
		vm.edit = function(obj) {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'app/appconfig/ccredit/templates/edit.view.html',
				controller: 'ModalCreditCardController as mCreditCtrl',
				size: '100px',
				resolve: {
					item: function() {
						return obj;
					}
				}
			});
		};

		// Open a request to remove item passing an id
		vm.remove = function(itemId) {

			CreditCardService
				.remove(itemId)
				.then(function(response) {

					vm.list();

				}, function(error) {

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
	function ModalCreditCardController(CreditCardService, $modalInstance, $rootScope, item) {
		var vm = this;

		vm.fields = {};

		vm.init = function() {
			if (item !== undefined) {
				vm.fields = item;
			}
		};

		vm.tooltips = true;

		vm.create = function() {
			var data = vm.fields;

			CreditCardService
				.save(data)
				.then(function(response) {

					$rootScope.$broadcast('updateCreditCardList', {});
					vm.close();

				}, function(error) {

				});
		};

		vm.save = function() {
			var data = vm.fields;

			CreditCardService
				.update(data, item._id)
				.then(function(response) {

					$rootScope.$broadcast('updateCreditCardList', {});
					vm.close();

				}, function(error) {

				});
		};

		vm.close = function () {
			$modalInstance.dismiss('cancel');
		};


		vm.init();
	}

	ModalCreditCardController.$inject = ['CreditCardService', '$modalInstance', '$rootScope', 'item'];

	angular
		.module('monificando.appconfig.ccredit')
		.controller('CreditCardController', CreditCardController)
		.controller('ModalCreditCardController', ModalCreditCardController);
}());
