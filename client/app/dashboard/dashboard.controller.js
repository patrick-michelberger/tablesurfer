'use strict';
(function(){

class DashboardComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('tablesurferApp')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: DashboardComponent
  });

})();
