'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('agb', {
        url: '/agb',
        template: '<agb></agb>'
      });
  });
