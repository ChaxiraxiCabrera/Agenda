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

        function get(search, offset) {
            var query = search;
            
            if (offset == 1){
                preOffset += 8;
            } else if (offset == 2){
                preOffset -= 8;
            }
            
            var completeUrl = url + 'q=' + query + key + '&limit=8&offset=' + preOffset;
            
            return $http.get(completeUrl)
                .then(displayData)
                .catch(displayError);
        }
        
        function displayData(response){
            return response.data.data;
        }
        
        function displayError(e){
            console.error('Error', e);
        }
    }
})();