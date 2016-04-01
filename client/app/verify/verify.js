'use strict';

angular.module('tablesurferApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verify', {
        url: '/verify/:verifycode',
        data: {
        	hideFooter: true
        },
        templateUrl: 'app/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  });