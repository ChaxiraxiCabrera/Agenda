(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('ComicInfoController', ComicInfoController);

    ComicInfoController.$inject = ['$scope', '$routeParams', 'MarvelFactory'];

    /* @ngInject */
    function ComicInfoController($scope, $routeParams, MarvelFactory){
        $scope.comic = {};
        $scope.characters = [];
        

        activate();

        ////////////////

        function activate() {
            MarvelFactory.getComic($routeParams.id).then(displayComic);
            MarvelFactory.getCharacters($routeParams.id).then(displayCharacters);
        }
        
        function displayComic(comic){
            $scope.comic = comic[0];
            console.log($scope.comic);
        }
        
        function displayCharacters(characters){
             $scope.characters = characters;
        }
    }
})();