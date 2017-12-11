(function () {
    'use strict';

    angular
        .module('Agenda')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'ContactLSFactory', 'GifsFactory', 'MarvelFactory'];

    /* @ngInject */
    function HomeController($scope, ContactLSFactory, GifsFactory, MarvelFactory) {

        $scope.contacts = [];
        $scope.contact = {};
        $scope.modify = 0;
        $scope.mode = 'form';
        $scope.gifsPreFav = [];
        $scope.comicsFav = [];

        $scope.addContact = addContact;
        $scope.modifyContact = modifyContact;
        $scope.updateContact = updateContact;
        $scope.removeContact = removeContact;
        $scope.changeMode = changeMode;
        
        $scope.checkContact = checkContact;
        
        

        activate();

        ////////////////

        function activate() {
            $scope.contacts = ContactLSFactory.getAll();
        }

        function addContact() {
            $scope.contact.id = ContactLSFactory.saveContact($scope.contact);
            $scope.contacts.push($scope.contact);
            cleanForm();
        }

        function modifyContact(contact) {
            $scope.contact = angular.copy(contact);
            $scope.modify = 1;
        }

        function updateContact() {
            for (let i = 0; i < $scope.contacts.length; i++) {
                if ($scope.contacts[i].id == $scope.contact.id) {
                    $scope.contacts[i] = $scope.contact;
                    ContactLSFactory.updateContact($scope.contact);
                }
            }
            cleanForm();
            $scope.modify = 0;
        }

        function removeContact(id) {
            var name = prompt("Si desea eliminarlo introduzca el nombre");
            for (let i = 0; i < $scope.contacts.length; i++) {
                if (($scope.contacts[i].name == name) && ($scope.contacts[i].id == id)) {
                    $scope.contacts.splice(i, 1);
                    ContactLSFactory.removeContact(id);
                }
            }
        }

        function changeMode(mode) {
            $scope.mode = mode;
        }

        function checkContact() {
            if ($scope.contactForm.$valid && $scope.contact.gifs && $scope.contact.comics)
                return true;
            return false;
        }

        function cleanForm() {
            $scope.contact = {};
            $scope.search = '';
            $scope.comic = '';
            $scope.mode = 'form';
            $scope.contactForm.$setUntouched();
            $scope.contactForm.$setPristine();
        }


    }
})();
