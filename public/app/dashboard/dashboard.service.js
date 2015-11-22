(function() {
	'use strict';

	function DashboardService(APIInfoService, $q, $http, moment) {
		var apiUrl 		= APIInfoService.getAPIUserLink(),
			Dashboard 	= {},
			now			= moment();

		Dashboard.getCreditCardsBill = function() {
			var startDate	= moment().startOf('month'),
				endDate		= now,
				startQuery 	= '?startDate=' + startDate.format('YYYY-MM-DD'),
				endQuery	= '&endDate=' + endDate.format('YYYY-MM-DD'),
				deferred	= $q.defer();

			$http
				.get(apiUrl + '/bills/search' + startQuery + endQuery)
				.then(function(response) {

					var list 		= response.data.list,
						collection	= {
							income: 	0,
							outcome: 	0,
							creditcard: 0
						};

					for (var index = 0; index < list.length; index++) {

						if ( list[index].payment.form === 'credit' && list[index].value < 0 ) {
							collection.creditcard += list[index].value * (-1);
						}

						if ( list[index].payment.form !== 'credit' && list[index].value < 0 ) {
							collection.outcome += list[index].value * (-1);
						}

						for (var count = 0; count < list.length; count++) {
							collection.income += list[count].value;
						}

					}

					deferred.resolve(collection);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		Dashboard.getBillsFromThisMonth = function() {
			var startDate	= moment().startOf('month'),
				endDate		= now,
				startQuery 	= '?startDate=' + startDate.format('YYYY-MM-DD'),
				endQuery	= '&endDate=' + endDate.format('YYYY-MM-DD'),
				deferred	= $q.defer();

			$http
				.get(apiUrl + '/bills/search' + startQuery + endQuery)
				.then(function(response) {

					var numberDays	= parseInt(endDate.diff(startDate, 'days')),
						list		= response.data.list,
						collection	= {
							labels: [],
							data: 	[]
						};

					for (var dia = 1; dia < numberDays; dia++) {
						collection.labels.push('Dia ' + dia);
						collection.data.push(0);

						for (var index = 0; index < list.length; index++) {
							if ( dia === moment(list[index].date).date() && list[index].value < 0) {
								collection.data[dia - 1] += list[index].value * (-1);
							}
						}

					}

					deferred.resolve(collection);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		Dashboard.getBillsByMonths = function(numberOfMonths) {
			var startDate	= moment().startOf('month').subtract(numberOfMonths - 1, 'months'),
				endDate		= moment().endOf('month'),
				startQuery	= '?startDate=' + startDate.format('YYYY-MM-DD'),
				endQuery	= '&endDate=' + endDate.format('YYYY-MM-DD'),
				deferred	= $q.defer();

			$http
				.get(apiUrl + '/bills/search' + startQuery + endQuery)
				.then(function(response) {

					var list 		= response.data.list,
						months 		= [],
						collection	= {
							labels: [],
							data: []
						};

					while (startDate.isBefore(endDate)) {
						months[startDate.format('MMM')] = 0;
						startDate = startDate.add(1, 'months');
					}

					for (var i = 0; i < list.length; i++) {

						for(var property in months) {

							if (property === moment(list[i].date).format('MMM') && list[i].value < 0) {
								months[property] += list[i].value * (-1);
							}
						}

					}

					for (var prop in months) {

						collection.labels.push(prop);

						collection.data.push(Number(Math.round(months[prop] + 'e2') + 'e-2'));

					}

					deferred.resolve(collection);

				}, function(error) {

					deferred.reject(error);

				});

			return deferred.promise;
		};

		return Dashboard;

	}

	DashboardService.$inject = ['APIInfoService', '$q', '$http', 'MomentJS'];

	angular
		.module('monificando.dashboard')
		.factory('DashboardService', DashboardService);
}());
