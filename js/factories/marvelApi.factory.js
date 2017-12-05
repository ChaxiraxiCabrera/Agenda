(function () {
    'use strict';
    angular
        .module('Agenda')
        .factory('MarvelFactory', MarvelFactory);

    MarvelFactory.$inject = ['$http'];

    /* @ngInject */
    function MarvelFactory($http) {
        var exports = {
            get: get
        };


        var url = 'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=2e7e7d8939e644a10fa14629b4561357&hash=48982b0f037aae96a9021c4340a7946f&titleStartsWith=';

        var limit = '&limit=3&offset=';

        var prevOffset = 0;

        return exports;

        ////////////////

        function get(search, offset) {

            if (offset == 1) {
                prevOffset += 3;
            } else if (offset == 2) {
                prevOffset -= 3;
            }

            var completeUrl = url + search + limit + prevOffset;
            console.log(completeUrl);

            return $http.get(completeUrl)
                .then(displayData)
                .catch(displayError);
        }

        function displayData(response) {
            var comics = generateImages(response.data.data.results);
            return comics;
        }

        function displayError(e) {
            console.error('Error', e);
        }


        function getHas() {
            var publicKey = '2e7e7d8939e644a10fa14629b4561357';
            var privateKey = '34a67ff8017c00fe50a48e260f191167c4396901';
            var md5 = '48982b0f037aae96a9021c4340a7946f';
        }


        function generateImages(comics) {
            for (let i = 0; i < comics.length; i++) {
                comics[i].cover = comics[i].thumbnail.path + '/portrait_medium.jpg';
            }
            return comics;
        }
    }
})();
