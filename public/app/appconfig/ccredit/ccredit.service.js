(function(){
	'use strict';

	function CreditCardService(APIInfoService, $resource) {
		var apiUrl = APIInfoService.getAPILink;

		return $resource(apiUrl + '/creditcards/:id');
	}

	CreditCardService.$inject = ['APIInfoService', '$resource'];

	angular
		.module('monificando.appconfig.ccredit')
		.factory('CreditCardService', CreditCardService);
}());
