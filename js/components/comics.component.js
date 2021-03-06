angular.module('Agenda')
    .component('comicsComponent', {
        templateUrl: 'js/components/comics.html',
        controller: controller,
        controllerAs: 'comicsComponent',
        bindings: {
            contact: '=',
        }
    })


controller.$inject = ['MarvelFactory', 'ContactLSFactory'];

function controller(MarvelFactory, ContactLSFactory) {
    var comicsComponent = this;

    comicsComponent.comics = [];
    comicsComponent.searchMode = 'start';
    //comicsComponent.direction = 0;
    comicsComponent.options = {
        limit: 3,
        direction: 0
    };

    comicsComponent.searchComics = searchComics;
    comicsComponent.toggleComicFav = toggleComicFav;
    comicsComponent.checkFavComic = checkFavComic;


    ////////////////

    this.$onInit = function () {
        comicsComponent.comicsFav = ContactLSFactory.getComics(comicsComponent.contact.id);
    }

    function searchComics(search, direction) {
        configOptions(direction);
        if (comicsComponent.searchMode == 'start') {
            //MarvelFactory.get(search, direction).then(displayComics);
            MarvelFactory.get(search, comicsComponent.options).then(displayComics);
        } else {
            MarvelFactory.getComicByCharId(search, comicsComponent.options).then(displayComics);
        }
    }

    function displayComics(comics) {
        comicsComponent.comics = comics;
    }

    function toggleComicFav(comic) {
        let isIn = false;
        let idx = 0;
        for (let i = 0; i < comicsComponent.comicsFav.length; i++) {
            if (comic.id == comicsComponent.comicsFav[i].id) {
                isIn = true;
                idx = i;
            }
        }

        if (!isIn) {
            comicsComponent.comicsFav.push(comic);
            comicsComponent.contact.comics = comicsComponent.comicsFav;
        } else {
            comicsComponent.comicsFav.splice(idx, 1);
            comicsComponent.contact.comics = comicsComponent.comicsFav;
        }

    }

    function checkFavComic(id) {
        for (let i = 0; i < comicsComponent.comicsFav.length; i++) {
            if (comicsComponent.comicsFav[i].id == id) {
                return true;
            }
        }
        return false;
    }

    function configOptions(direction) {
        if (direction == 1) {
            comicsComponent.options.direction += 3;
        } else if (direction == 2) {
            comicsComponent.options.direction -= 3;
        } else if (direction == 0) {
            comicsComponent.options.direction = 0;
        }
    }

}
