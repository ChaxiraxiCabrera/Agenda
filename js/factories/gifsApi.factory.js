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
        

        return exports;

        ////////////////

        function get(search) {
            var query = search;
            var completeUrl = url + 'q=' + query + key + '&limit=10';
            
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