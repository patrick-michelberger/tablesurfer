'use strict';

angular.module('tablesurferApp')
  .controller('OauthButtonsCtrl', function($window, $state) {
    this.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    console.log("$state: ", $state.includes('login'));

    this.$state = $state;
  });
