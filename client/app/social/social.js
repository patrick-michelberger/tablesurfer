'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('social', {
        url: '/social',
        template: '<social></social>'
      });
  });
