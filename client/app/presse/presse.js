'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('presse', {
        url: '/presse',
        template: '<presse></presse>'
      });
  });
