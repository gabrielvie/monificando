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
				name: 'Agenda',
				sref: 'app.bills'
			},
			config: {
				icon: 'graphic',
				name: 'Configurações',
				sref: 'app.config'
			},
			config_ccards: {
				icon: '',
				name: 'Cartões de Crédito',
				sref: 'app.config.credit'
			}
		};
	}

	SidebarService.$inject = [];

	angular
		.module('monificando.parts')
		.service('SidebarService', SidebarService);
})();
