(function(){
	'use strict';

	angular
		.module('monificando.partials')
		.controller('HeaderController', HeaderController);

	HeaderController.$injector = [];

	function HeaderController() {
		var vm = this;

		vm.calendarNotify = { count: 1 };
		vm.alarmNotify = { count: 18 };
	}
})();
