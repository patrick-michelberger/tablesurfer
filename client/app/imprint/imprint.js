'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('imprint', {
        url: '/imprint',
        template: '<imprint></imprint>'
      });
  });
