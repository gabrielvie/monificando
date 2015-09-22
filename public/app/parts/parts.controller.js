(function() {
	'user strict';

	/* Header */
	function HeaderController(AuthenticationService) {
		var vm = this;

		vm.calendarNotify = { count: 1 };
		vm.alarmNotify = { count: 11 };

		vm.signOut = function() {
			AuthenticationService.signOut();
		};
	}

	HeaderController.$inject = ['AuthenticationService'];

	/* Content Area */
	function ContentAreaController($scope, $state) {
		var vm = this;

		$scope.currentState = $state;
		vm.updateMainSectionTitle = function(data) {
			vm.sectionTittle = data.displayName;
			vm.sectionDate = data.displayDescription;
		};

		$scope.$watch('currentState.$current', function(newValue, oldValue) {
			if (newValue.data !== undefined) {
				vm.updateMainSectionTitle(newValue.data);
			}
		});
	}

	ContentAreaController.$inject = ['$scope', '$state'];

	/* Sidebar Controller */
	function SidebarController($scope, $state, SidebarService) {
		var vm = this;

		vm.menu = SidebarService.menu;
		vm.srefSelected = "";

		$scope.currentState = $state;


		vm.isSelected = function(srefLink) {
			return srefLink === vm.srefSelected;
		};

		$scope.$watch('currentState.$current', function(newValue, oldValue) {
			if (newValue.data !== undefined) {
				vm.srefSelected = newValue.name;
			}
		});
	}

	SidebarController.$inject = ['$scope', '$state', 'SidebarService'];

	angular
		.module('monificando.parts')
		.controller('HeaderController', HeaderController)
		.controller('ContentAreaController', ContentAreaController)
		.controller('SidebarController', SidebarController);
})();
