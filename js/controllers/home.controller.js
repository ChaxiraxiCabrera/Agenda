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
        $scope.mode = 0;
        $scope.gifs = [];
        $scope.gifsPreFav = [];
        $scope.comics = [];
        $scope.comicsFav = [];
        $scope.filterMode = '';
        $scope.searchMode = 0;
        $scope.direction = 0;


        $scope.addContact = addContact;
        $scope.modifyContact = modifyContact;
        $scope.updateContact = updateContact;
        $scope.removeContact = removeContact;
        $scope.changeMode = changeMode;
        $scope.searchGif = searchGif;
        $scope.toggleGifFav = toggleGifFav;
        $scope.searchComics = searchComics;
        $scope.toggleComicFav = toggleComicFav;
        $scope.checkContact = checkContact;
        $scope.changeFilter = changeFilter;
        $scope.checkFav = checkFav;
        $scope.checkFavComic = checkFavComic;

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
            if (mode == 1) {
                $scope.gifsPreFav = ContactLSFactory.getGifs($scope.contact.id);
            } else if (mode == 2) {
                $scope.comicsFav = ContactLSFactory.getComics($scope.contact.id);
            }

        }

        function searchGif(search, direction) {
            GifsFactory.get(search, direction).then(displayGifs);
        }

        function displayGifs(gifs) {
            $scope.gifs = gifs;
        }

        function toggleGifFav(gif) {
            let isIn = false;
            let idx = 0;
            for (let i = 0; i < $scope.gifsPreFav.length; i++) {
                if (gif.id == $scope.gifsPreFav[i].id) {
                    isIn = true;
                    idx = i;
                }
            }

            if (!isIn) {
                $scope.gifsPreFav.push(gif);
                $scope.contact.gifs = $scope.gifsPreFav;
            } else {
                $scope.gifsPreFav.splice(idx, 1);
                $scope.contact.gifs = $scope.gifsPreFav;
            }

        }

        function randId() {
            return Math.random().toString(36).substr(2, 20);
        }

        function searchComics(search, direction) {
            $scope.direction = direction;
            if ($scope.searchMode == 0) {
                MarvelFactory.get(search, direction).then(displayComics);
            } else {
                MarvelFactory.getComicByCharacter(search).then(getCharacterId);
            }
        }

        function displayComics(comics) {
            $scope.comics = comics;
        }

        function toggleComicFav(comic) {
            let isIn = false;
            let idx = 0;
            for (let i = 0; i < $scope.comicsFav.length; i++) {
                if (comic.id == $scope.comicsFav[i].id) {
                    isIn = true;
                    idx = i;
                }
            }

            if (!isIn) {
                $scope.comicsFav.push(comic);
                $scope.contact.comics = $scope.comicsFav;
            } else {
                $scope.comicsFav.splice(idx, 1);
                $scope.contact.comics = $scope.comicsFav;
            }

        }

        function checkContact() {
            if ($scope.contactForm.$valid && $scope.contact.gifs && $scope.contact.comics)
                return true;
            return false;
        }

        function changeFilter(mode) {
            if (mode == 0) {
                $scope.filterMode = 'rating';
            } else if (mode == 1) {
                $scope.filterMode = 'trending_datetime';
            }
        }

        function cleanForm() {
            $scope.contact = {};
            $scope.search = '';
            $scope.comic = '';
            $scope.contactForm.$setUntouched();
            $scope.contactForm.$setPristine();
        }

        function checkFav(id) {
            for (let i = 0; i < $scope.gifsPreFav.length; i++) {
                if ($scope.gifsPreFav[i].id == id) {
                    return true;
                }
            }
            return false;
        }

        function checkFavComic(id) {
            for (let i = 0; i < $scope.comicsFav.length; i++) {
                if ($scope.comicsFav[i].id == id) {
                    return true;
                }
            }
            return false;
        }

        function getCharacterId(id) {
            console.log(id);
            MarvelFactory.getCharacter(id, $scope.direction).then(displayComics);
        }

    }
})();
