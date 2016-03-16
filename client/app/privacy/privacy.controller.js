'use strict';
(function(){

class PrivacyComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('privacy', {
    templateUrl: 'app/privacy/privacy.html',
    controller: PrivacyComponent
  });

})();
