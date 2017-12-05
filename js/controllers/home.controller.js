(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'ContactLSFactory', 'GifsFactory'];

    /* @ngInject */
    function HomeController($scope, ContactLSFactory, GifsFactory){
        
        $scope.contacts = [];
        $scope.contact = {};
        $scope.modify = 0;
        $scope.mode = 0;
        $scope.gifs = [];
        $scope.gifsPreFav = [];
        
        
        $scope.addContact = addContact;
        $scope.modifyContact = modifyContact;
        $scope.updateContact = updateContact;
        $scope.removeContact = removeContact;
        $scope.changeMode = changeMode;
        $scope.searchGif = searchGif;
        $scope.setFavGif = setFavGif;
        $scope.removeFavGif = removeFavGif;
        $scope.saveGifs = saveGifs;

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
        
        function changeMode(mode){
            $scope.mode = mode;
            if (mode == 1)
                $scope.gifsPreFav = ContactLSFactory.getGifs($scope.contact.id);
        }
        
        function searchGif(search){
            GifsFactory.get(search).then(displayGifs);
        }
        
        function displayGifs(gifs){
            $scope.gifs = gifs;
            console.log($scope.gifs);
        }
        
        function setFavGif(gif){
            let isIn = false;
            for (let i = 0; i < $scope.gifsPreFav.length; i++){
                if (gif.id == $scope.gifsPreFav[i].id){
                   isIn = true;
                }
            }
            
            if(!isIn)
                 $scope.gifsPreFav.push(gif);
        }
        
        function removeFavGif(id){
            for (let i = 0; i < $scope.gifsPreFav.length; i++){
                if (id == $scope.gifsPreFav[i].id){
                   $scope.gifsPreFav.splice(i, 1);
                    ContactLSFactory.removeGif(id, $scope.contact.id);
                }
            }
        }
        
        function saveGifs(){
            ContactLSFactory.saveGifs($scope.gifsPreFav, $scope.contact.id);
        }
        
        
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
    }
})();