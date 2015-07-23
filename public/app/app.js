/*global angular, console */
(function () {
    'use strict';

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.view.html'
            })
            .otherwise('/dashboard');

        //$locationProvider.html5Mode(true);
    }

    angular
        .module('app', [
            'ngRoute'
        ])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

}());
