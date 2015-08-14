(function(){
	'use strict';

	angular
		.module('monificando.partials')
		.service('SidebarService', SidebarService);

	SidebarService.$injector = [];

	function SidebarService() {
		this.menu = {
			main: {
				icon: 'home',
				name: 'Painel Principal',
				sref: 'app'
			},
			agenda: {
				icon: 'agenda',
				name: 'Minha Agenda',
				sref: 'app.agenda'
			},
			graphic: {
				icon: 'graphic',
				name: 'Meus Gastos',
				sref: 'app.graphics'
			}
		};
	}

})();
