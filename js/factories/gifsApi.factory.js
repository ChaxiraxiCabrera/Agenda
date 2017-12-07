(function () {
    'use strict';
    angular
        .module('Agenda')
        .factory('GifsFactory', GifsFactory);

    GifsFactory.$inject = ['$http'];

    /* @ngInject */
    function GifsFactory($http){
        var exports = {
            get: get
        };
        
        var url = 'http://api.giphy.com/v1/gifs/search?';
        var key = '&api_key=YlVbS6fKZH8IKVEiQReQb82TlbKaAWzF';
        var preOffset = 0;
        

        return exports;

        ////////////////

        function get(search, direction) {
            var query = search;
            
            if (direction == 1){
                preOffset += 8;
            } else if (direction == 2){
                preOffset -= 8;
            } else if (direction == 0){
                preOffset = 0;
            }
            
            var completeUrl = url + 'q=' + query + key + '&limit=8&offset=' + preOffset;
            
            return $http.get(completeUrl)
                .then(formatData)
                .catch(displayError);
        }
        
        function formatData(response){
            var gifs = [];
            var gif = {}
            
            for (let i = 0; i < response.data.data.length; i++){
                gif.id = response.data.data[i].id;
                gif.image = response.data.data[i].images.preview_gif.url;
                gif.trending_datetime = response.data.data[i].trending_datetime;
                gif.rating = response.data.data[i].rating;
                gifs.push(angular.copy(gif));
            }
            
            return gifs;
        }
        
        function displayError(e){
            console.error('Error', e);
        }
    }
})();