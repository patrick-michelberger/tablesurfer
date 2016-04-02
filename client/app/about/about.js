'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        template: '<about></about>',
        data: {
        	hideFooter: true
        }
      });
  });
