(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'ContactLSFactory', 'GifsFactory', 'MarvelFactory'];

    /* @ngInject */
    function HomeController($scope, ContactLSFactory, GifsFactory, MarvelFactory){
        
        $scope.contacts = [];
        $scope.contact = {};
        $scope.modify = 0;
        $scope.mode = 0;
        $scope.gifs = [];
        $scope.gifsPreFav = [];
        $scope.comics = [];
        $scope.comicsFav = [];
        $scope.filterMode = '';
        
        
        $scope.addContact = addContact;
        $scope.modifyContact = modifyContact;
        $scope.updateContact = updateContact;
        $scope.removeContact = removeContact;
        $scope.changeMode = changeMode;
        $scope.searchGif = searchGif;
        $scope.setFavGif = setFavGif;
        $scope.removeFavGif = removeFavGif;
        $scope.searchComics = searchComics;
        $scope.setComicFav = setComicFav;
        $scope.removeFavComic = removeFavComic;
        $scope.checkContact= checkContact;
        $scope.changeFilter = changeFilter;

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
            if (mode == 1){
                $scope.gifsPreFav = ContactLSFactory.getGifs($scope.contact.id);
            }else if (mode == 2){
                $scope.comicsFav = ContactLSFactory.getComics($scope.contact.id);
            }
                
        }
        
        function searchGif(search, offset){
            GifsFactory.get(search, offset).then(displayGifs);
        }
        
        function displayGifs(gifs){
            $scope.gifs = gifs;
        }
        
        function setFavGif(gif){
            let isIn = false;
            for (let i = 0; i < $scope.gifsPreFav.length; i++){
                if (gif.id == $scope.gifsPreFav[i].id){
                   isIn = true;
                }
            }
            
            if(!isIn){
                $scope.gifsPreFav.push(gif);
                $scope.contact.gifs = $scope.gifsPreFav;
            }
                 
        }
        
        function removeFavGif(id){
            for (let i = 0; i < $scope.gifsPreFav.length; i++){
                if (id == $scope.gifsPreFav[i].id){
                   $scope.gifsPreFav.splice(i, 1);
                   $scope.contact.gifs = $scope.gifsPreFav;
                }
            }
        }
        
        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }
        
        function searchComics(search, offset){
            MarvelFactory.get(search, offset).then(displayComics);
        }
        
        function displayComics(comics){
            $scope.comics = comics;
        }
        
        function setComicFav(comic){
            let isIn = false;
            for (let i = 0; i < $scope.comicsFav.length; i++){
                if(comic.id == $scope.comicsFav[i].id)
                    isIn = true;
            }
            
            if (!isIn){
                $scope.comicsFav.push(comic);
                $scope.contact.comics = $scope.comicsFav;
            }
                
        }
        
        function removeFavComic(id) {
            for (let i = 0; i < $scope.comicsFav.length; i++){
                if (id == $scope.comicsFav[i].id){
                   $scope.comicsFav.splice(i, 1);
                    $scope.contact.comics = $scope.comicsFav;
                }
            }
        }
        
        function checkContact(){
            if ($scope.contact.name && $scope.contact.photo  
                && $scope.contact.phone && $scope.contact.email 
                && $scope.contact.gifs && $scope.contact.comics){
                return true;
            }
            return false;
        }
        
        function changeFilter (mode){
            if ( mode == 0){
                $scope.filterMode = 'rating';
            } else if ( mode == 1){
                $scope.filterMode = 'trending_datetime';
            }
        }
        
    }
})();