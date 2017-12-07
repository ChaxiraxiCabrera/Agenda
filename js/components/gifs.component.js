angular.module('Agenda')
    .component('gifsComponent', {
        templateUrl: 'js/components/gifs.html',
        controller: controller,
        controllerAs: 'gifsComponent',
        bindings: {
            contact: '='
        }
    })


controller.$inject = ['GifsFactory', 'ContactLSFactory'];

function controller(GifsFactory, ContactLSFactory) {
    var gifsComponent = this;

    gifsComponent.filterMode = '';
    gifsComponent.gifs = [];

    gifsComponent.searchGif = searchGif;
    gifsComponent.toggleGifFav = toggleGifFav;
    gifsComponent.checkFav = checkFav;
    gifsComponent.changeFilter = changeFilter;


    ////////////////

    this.$onInit = function () {
        gifsComponent.gifsPreFav = ContactLSFactory.getGifs(gifsComponent.contact.id);
    }

    function searchGif(search, direction) {
        GifsFactory.get(search, direction).then(displayGifs);
    }

    function displayGifs(gifs) {
        gifsComponent.gifs = gifs;
    }

    function toggleGifFav(gif) {
        let isIn = false;
        let idx = 0;
        console.log(gifsComponent.gifsPreFav);
        for (let i = 0; i < gifsComponent.gifsPreFav.length; i++) {
            if (gif.id == gifsComponent.gifsPreFav[i].id) {
                isIn = true;
                idx = i;
            }
        }

        if (!isIn) {
            gifsComponent.gifsPreFav.push(gif);
            gifsComponent.contact.gifs = gifsComponent.gifsPreFav;
        } else {
            gifsComponent.gifsPreFav.splice(idx, 1);
            gifsComponent.contact.gifs = gifsComponent.gifsPreFav;
        }

    }

    function checkFav(id) {
        for (let i = 0; i < gifsComponent.gifsPreFav.length; i++) {
            if (gifsComponent.gifsPreFav[i].id == id) {
                return true;
            }
        }
        return false;
    }

    function changeFilter(mode) {
        if (mode == 0) {
            gifsComponent.filterMode = 'rating';
        } else if (mode == 1) {
            gifsComponent.filterMode = 'trending_datetime';
        }
    }

}
