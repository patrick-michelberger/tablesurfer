'use strict';
(function(){

class AgbComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('agb', {
    templateUrl: 'app/agb/agb.html',
    controller: AgbComponent
  });

})();
