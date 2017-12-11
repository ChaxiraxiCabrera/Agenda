(function () {
    'use strict';
    angular
        .module('Agenda')
        .factory('MarvelFactory', MarvelFactory);

    MarvelFactory.$inject = ['$http'];

    /* @ngInject */
    function MarvelFactory($http) {
        var exports = {
            get: get,
            getComic: getComic,
            getCharacters: getCharacters,
            getCharacter: getCharacter,
            getComicByCharacter: getComicByCharacter,
            getComicByCharId: getComicByCharId
        };


        var baseUrl = 'http://gateway.marvel.com/v1/public/comics';
        var key = '?ts=1&apikey=2e7e7d8939e644a10fa14629b4561357&hash=48982b0f037aae96a9021c4340a7946f';
        var limit = '&limit=3&offset=';
        var searchOptions = {};

        return exports;

        ////////////////

        function get(search, options) {

            var completeUrl = baseUrl + key + '&titleStartsWith=' + search + limit + options;

            return $http.get(completeUrl)
                .then(formatData)
                .catch(displayError);
        }

        function getComicByCharacter(search, options) {

            baseUrl = 'http://gateway.marvel.com/v1/public/comics';
            var completeUrl = baseUrl + key + '&characters=' + search + limit + options.direction;

            return $http.get(completeUrl)
                .then(formatData)
                .catch(displayError);
        }

        function formatData(response) {
            var comics = [];
            var comic = {}

            for (let i = 0; i < response.data.data.results.length; i++) {
                comic.id = response.data.data.results[i].id;
                comic.cover = response.data.data.results[i].thumbnail.path + '/portrait_medium.jpg';
                comic.coverGrand = response.data.data.results[i].thumbnail.path + '/portrait_uncanny.jpg';
                comic.title = response.data.data.results[i].title;
                comic.description = response.data.data.results[i].description;
                comic.pageCount = response.data.data.results[i].pageCount;
                comic.date = response.data.data.results[i].dates[0].date;
                comics.push(angular.copy(comic));
            }

            return comics;
        }

        function displayDataCharacters(response) {
            return response.data.data.results;
        }

        function displayError(e) {
            console.error('Error', e);
        }

        function getComic(idComic) {
            var completeUrl = baseUrl + '/' + idComic + key;

            return $http.get(completeUrl)
                .then(formatData)
                .catch(displayError);
        }

        function getCharacters(idComic) {
            var completeUrl = baseUrl + '/' + idComic + '/characters' + key;

            return $http.get(completeUrl)
                .then(displayDataCharacters)
                .catch(displayError);
        }

        function getCharacter(name) {

            baseUrl = 'http://gateway.marvel.com/v1/public/characters';
            var completeUrl = baseUrl + key + '&name=' + name;

            return $http.get(completeUrl)
                .then(getCharacterId)
                .catch(displayError);
        }

        function getCharacterId(response) {
            return response.data.data.results[0].id;
        }

        function getComicByCharId(search, options) {
            searchOptions = options;
            console.log(options);
            return getCharacter(search).then(getComics);
        }

        function getComics(id) {
           console.log(searchOptions);
           return getComicByCharacter(id, searchOptions);
        }


    }
})();
