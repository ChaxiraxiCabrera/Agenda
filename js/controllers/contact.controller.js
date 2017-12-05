(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', '$routeParams', 'ContactLSFactory'];

    /* @ngInject */
    function ContactController($scope, $routeParams, ContactLSFactory){
        
        $scope.contact = {};
        $scope.gifs = [];
        $scope.comics = [];

        activate();

        ////////////////

        function activate() {
            $scope.contact = ContactLSFactory.getContact($routeParams.id);
            $scope.gifs = ContactLSFactory.getGifs($routeParams.id);
            $scope.comics = ContactLSFactory.getComics($routeParams.id);
        }
    }
})();