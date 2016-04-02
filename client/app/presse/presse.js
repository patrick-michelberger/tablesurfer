'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('press', {
        url: '/press',
        template: '<presse></presse>',
        data: {
        	hideFooter: true
        }
      });
  });
