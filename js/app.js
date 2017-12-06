(function () {
    'use strict';

    angular
        .module('Agenda', ['ngRoute']).config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'views/home.html'
            })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'views/home.html'
            })
            .when('/contact/:id', {
                controller: 'ContactController',
                templateUrl: 'views/contact.html'
            })
            .when('/comic/:id', {
                controller: 'ComicInfoController',
                templateUrl: 'views/comic.html'
            })
    }
})();
