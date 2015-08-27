(function(){
	'use strict';

	angular
		.module('monificando.utils', [])
		.service('DateService', DateService);

	DateService.$injector = [];

	function DateService() {
		this.months = [
			{ _id: '1', name: "Janeiro", 	current: true },
			{ _id: '2', name: "Fevereiro", current: false },
			{ _id: '3', name: "Março", 	current: false },
			{ _id: '4', name: "Abril", 	current: false },
			{ _id: '5', name: "Maio", 		current: false },
			{ _id: '6', name: "Junho", 	current: false },
			{ _id: '7', name: "Julho", 	current: false },
			{ _id: '8', name: "Agosto", 	current: false },
			{ _id: '9', name: "Setembro", 	current: false },
			{ _id: '10', name: "Outubro", 	current: false },
			{ _id: '11', name: "Novembro", 	current: false },
			{ _id: '12', name: "Dezembro", 	current: false }
		];

		this.setCurrentMonth = function(date) {
			var monthNumber = date.getMonth();
			if (this.months[monthNumber] !== 'undefined') {
				this.months.forEach(function(month, index){
					if (index !== monthNumber) {
						month.current = false;
					} else {
						month.current = true;
					}
				});
			}
		};
	}
})();
