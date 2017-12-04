(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'ContactLSFactory'];

    /* @ngInject */
    function HomeController($scope, ContactLSFactory){
        
        $scope.contacts = [];
        $scope.contact = {};
        $scope.modify = 0;
        
        $scope.addContact = addContact;
        $scope.modifyContact = modifyContact;
        $scope.updateContact = updateContact;
        $scope.removeContact = removeContact;

        activate();

        ////////////////

        function activate() {
            $scope.contacts = ContactLSFactory.getAll();
        }
        
        function addContact(){
            $scope.contact.id = randId();
            $scope.contacts.push($scope.contact);
            ContactLSFactory.saveContact($scope.contact);
            $scope.contact = {};
        }
        
        function modifyContact(contact){
            $scope.contact = angular.copy(contact);
            $scope.modify = 1;
        }
        
        function updateContact(){
            for (let i = 0; i < $scope.contacts.length; i++){
                if ($scope.contacts[i].id == $scope.contact.id){
                    $scope.contacts[i] = $scope.contact;
                    ContactLSFactory.updateContact($scope.contact);
                }
            }
            $scope.contact = {};
            $scope.modify = 0;
        }
        
        function removeContact(){
            var name = prompt("Si desea eliminarlo introduzca el nombre");
            for (let i = 0; i < $scope.contacts.length; i++){
                if ($scope.contacts[i].name == name){
                    $scope.contacts.splice(i, 1);
                    ContactLSFactory.removeContact($scope.contacts[i].id);
                }
            }
        }
        
        
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
    }
})();