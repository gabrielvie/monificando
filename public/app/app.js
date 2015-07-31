/*global angular, console */
(function () {
    'use strict';

    /*function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.view.html'
            })
            .otherwise('/dashboard');

        //$locationProvider.html5Mode(true);
    }*/

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('painel', {
            url: '/',
            templateUrl: 'app/dashboard/dashboard.view.html',
            controller: function() {}
        });
    }

    angular
        .module('app', [
            'ui.router'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

})();
