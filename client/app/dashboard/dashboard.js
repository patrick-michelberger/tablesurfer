'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        template: '<dashboard></dashboard>',
        authenticate: true
      });
  });
