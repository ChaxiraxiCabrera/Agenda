(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', '$routeParams', 'ContactLSFactory'];

    /* @ngInject */
    function ContactController($scope, $routeParams, ContactLSFactory){
        
        $scope.contact = {};

        activate();

        ////////////////

        function activate() {
            $scope.contact = ContactLSFactory.getContact($routeParams.id);
        }
    }
})();