'use strict';
(function(){

class ImprintComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('imprint', {
    templateUrl: 'app/imprint/imprint.html',
    controller: ImprintComponent
  });

})();
