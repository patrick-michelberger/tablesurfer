'use strict';
(function(){

class SocialComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('social', {
    templateUrl: 'app/social/social.html',
    controller: SocialComponent
  });

})();
