(function(){
	'use strict';

	function SidebarService() {
		this.menu = {
			main: {
				icon: 'home',
				name: 'Painel Principal',
				sref: 'app.dashboard'
			},
			agenda: {
				icon: 'agenda',
				name: 'Minha Agenda',
				sref: 'app.bills'
			},
			graphic: {
				icon: 'graphic',
				name: 'Meus Gastos',
				sref: 'app.graphics'
			}
		};
	}

	SidebarService.$inject = [];

	angular
		.module('monificando.parts')
		.service('SidebarService', SidebarService);
})();
