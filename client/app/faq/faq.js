'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('faq', {
        url: '/faq',
        template: '<faq></faq>',
        data: {
        	hideFooter: true
        }
      });
  });
