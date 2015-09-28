(function(){
	'use strict';

	function CreditCardController($modal) {
		var vm = this;

		vm.new = function() {
			var modal = $modal.open({
				animation: true,
				templateUrl: '/app/appconfig/ccredit/templates/modal.view.html',
				controller: 'ModalCreditCardController as mCreditCtrl',
				size: '100px'
			});
		};
	}

	CreditCardController.$inejct = ['$modal'];

	function ModalCreditCardController(CreditCardService, $filter) {
		var vm = this;

		vm.fields = {
			description: null,
			paymentDate: null,
			buyDate: null,
			validThru: null
		};

		vm.calendarField = {
			paymentDate: false,
			buyDate: false,
			validThru: false
		};

		vm.tooltips = true;

		vm.create = function() {
			var data = {
				description: vm.fields.description,
				payment_date: $filter('date')(vm.fields.description, 'dd'),
				buy_date: $filter('date')(vm.fields.buyDate, 'dd'),
				valid_thru: $filter('date')(vm.fields.validThru, 'dd')
			};

			CreditCardService.save(data);
		};

	}

	ModalCreditCardController.$inejct = ['CreditCardService', '$filter'];

	angular
		.module('monificando.appconfig.ccredit')
		.controller('CreditCardController', CreditCardController)
		.controller('ModalCreditCardController', ModalCreditCardController);
}());
