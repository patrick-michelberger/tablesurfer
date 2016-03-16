'use strict';
(function(){

class FaqComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('faq', {
    templateUrl: 'app/faq/faq.html',
    controller: FaqComponent
  });

})();
