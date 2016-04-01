'use strict';

angular.module('tablesurferApp')
  .controller('OauthButtonsCtrl', function($window, $state, $location) {
    this.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    this.isCorporate = $location.search().corporate || false;

    this.$state = $state;
  });
