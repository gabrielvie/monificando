(function(){
	'use strict';

	function BillsController($modal) {
		var vm = this;

		vm.new = function() {
			var modal = $modal.open({
				animation: true,
				templateUrl: 'app/bills/templates/new.view.html',
				controller: 'NewBillModalController as nBillCtrl',
				size: '100px'
			});
		};
	}

	BillsController.$inject = ['$modal', '$scope'];

	function NewBillModalController() {
		var vm = this;

		vm.new = {
			type: 'credit',
			description: null,
			value: null,
			date: new Date(),
			category: null,
			subcategory: null,
			hasFrequency: false,
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

		vm.frequencies = [
			{ value: 'weekly', 	 	display: 'Semanal' },
			{ value: 'biweekly', 	display: 'Quinzenal' },
			{ value: 'monthly',  	display: 'Mensal', selected: true },
			{ value: 'bimonthly', 	display: 'Bimestral' },
			{ value: 'quarterly', 	display: 'Trimestral' },
			{ value: 'semiannual', 	display: 'Semestral' },
			{ value: 'annual', 		display: 'Anual' }
		];

		vm.freqRepeats = [
			{ value: 'no_prev', 	display: 'Sem Previsões', selected: true },
			{ value: 'repeat', 		display: 'Repetido' },
			{ value: 'divided', 	display: 'Parcelado' }
		];

		vm.paymentOptions = [
			{ value: null, 			display: 'Forma de Pagamento', selected: true },
			{ value: 'money', 		display: 'Dinheiro' },
			{ value: 'debit', 		display: 'Débito em Conta' },
			{ value: 'credit', 		display: 'Cartão de Crédito' }
		];

		vm.create = function(){
			console.log(vm.new);
		};
	}

	NewBillModalController.$inject = [];

	angular
		.module('monificando')
		.controller('BillsController', BillsController)
		.controller('NewBillModalController', NewBillModalController);
}());
