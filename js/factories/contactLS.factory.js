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
            getGifs: getGifs
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
            console.log(id);
            var contact = getContact(id);
            console.log(contact);
            if(contact.hasOwnProperty('gifs'))
                return contact.gifs;
            return [];
        }
    }
})();