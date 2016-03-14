'use strict';

angular.module('tablesurferApp')
  .controller('OauthButtonsCtrl', function($window) {
    this.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
