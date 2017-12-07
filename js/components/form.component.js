angular.module('Agenda')
    .component('formComponent', {
        templateUrl: 'js/components/form.html',
        controller: controller,
        controllerAs: 'formComponent',
        bindings: {
            contact: '=',
            contactForm: '='
        }
    })


function controller() {
    var formComponent = this;

    formComponent.$onInit = function (){
       
    }
}
