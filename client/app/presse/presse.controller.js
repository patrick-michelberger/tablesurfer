'use strict';
(function(){

class PresseComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('presse', {
    templateUrl: 'app/presse/presse.html',
    controller: PresseComponent
  });

})();
