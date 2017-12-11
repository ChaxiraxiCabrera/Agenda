angular.module('Agenda')
    .component('formComponent', {
        templateUrl: 'js/components/form.html',
        controller: controller,
        controllerAs: 'formComponent',
        bindings: {
            contact: '=',
            form: '='
        }
    })


function controller() {
    var formComponent = this;
    
    formComponent.$onInit = function (){
        
        //setTimeout( () => console.log('COMPONENTE' + formComponent.contactForm), 20)
        
    } 
    
    /*formComponent.$onChanges = function (){
        
    } */
}
