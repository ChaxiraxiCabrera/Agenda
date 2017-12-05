(function () {
    'use strict';
    angular
        .module('Agenda')
        .factory('ContactLSFactory', ContactLSFactory );

    ContactLSFactory.$inject = [];

    /* @ngInject */
    function ContactLSFactory (){
        var exports = {
            saveContact: saveContact,
            getAll: getAll,
            updateContact: updateContact,
            removeContact: removeContact,
            getContact: getContact,
            saveGifs: saveGifs,
            getGifs: getGifs,
            removeGif: removeGif,
            saveComics: saveComics, 
            getComics: getComics,
            removeComic: removeComic
        };
            

        return exports;

        ////////////////
        
        function getAll(){
            if ('contacts' in localStorage)
                return JSON.parse(localStorage.getItem('contacts'));
            return [];
        }
        
        function getContact(id){
            var contacts = getAll();
            for (let i = 0; i < contacts.length; i++){
                if (contacts[i].id == id){
                    return contacts[i];
                }
            }
            return {};
        }

        function saveContact(contact) {
            var contacts = getAll();
            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
        
        function updateContact(contact){
            var contacts = getAll();
            for (let i = 0; i < contacts.length; i++){
                if (contacts[i].id == contact.id){
                    contacts[i] = contact;
                    localStorage.setItem('contacts', JSON.stringify(contacts));
                }
            }
        }
        
        function removeContact(id){
            var contacts = getAll();
            for (let i = 0; i < contacts.length; i++){
                if (contacts[i].id == id){
                    contacts.splice(i, 1);
                    localStorage.setItem('contacts', JSON.stringify(contacts));
                }
            }
        }
        
        function saveGifs(gifs, id){
            var contact = getContact(id);
            contact.gifs = gifs;
            updateContact(contact);
        }
        
        function getGifs(id){
            var contact = getContact(id);
            if(contact.hasOwnProperty('gifs'))
                return contact.gifs;
            return [];
        }
        
        function removeGif(idGif, idContact){
            var gifs = getGifs(idContact);
            for (let i = 0; i < gifs.length; i++){
                if (gifs[i].id == idGif){
                     gifs.splice(i, 1);
                     saveGifs(gifs, idContact);
                }
            }
        }
        
        function saveComics(comics, id){
            var contact = getContact(id);
            contact.comics = comics;
            updateContact(contact);
        }
        
        function getComics(id){
            var contact = getContact(id);
            if(contact.hasOwnProperty('comics'))
                return contact.comics;
            return [];
        }
        
        function removeComic(idComic, idContact){
            var comics = getComics(idContact);
            for (let i = 0; i < comics.length; i++){
                if (comics[i].id == idComic){
                     comics.splice(i, 1);
                     saveComics(comics, idContact);
                }
            }
        }
    }
})();