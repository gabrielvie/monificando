(function () {
    'use strict';
    
    angular
        .module('monificando.utils')
        .service('DateService', DateService);
    
    DateService.$injector = [];
    
    function DateService() {
        this.months = [
			{name: "Janeiro", mNum: 1, current: true },
			{name: "Fevereiro", mNum: 2, current: false },
			{name: "Março", mNum: 3, current: false },
			{name: "Abril", mNum: 4, current: false },
			{name: "Maio", mNum: 5, current: false },
			{name: "Junho", mNum: 6, current: false },
			{name: "Julho", mNum: 7, current: false },
			{name: "Agosto", mNum: 8, current: false },
			{name: "Setembro", mNum: 9, current: false },
			{name: "Outubro", mNum: 10, current: false },
			{name: "Novembro", mNum: 11, current: false },
			{name: "Dezembro", mNum: 12, current: false }
		];
        
		this.getMonths = function(date) {
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
            
            return this.months;
		};
    }
        
})();