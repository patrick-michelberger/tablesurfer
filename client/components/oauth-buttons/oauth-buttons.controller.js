'use strict';

angular.module('tablesurferApp')
  .controller('OauthButtonsCtrl', function($window, $state) {
    this.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    this.$state = $state;
  });
