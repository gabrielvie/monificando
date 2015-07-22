(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ])
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/app/app.html',
                controller: 'AppController',
                controllerAs: 'app'
            });
    }
}());
