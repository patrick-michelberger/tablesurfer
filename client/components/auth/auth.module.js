'use strict';

angular.module('tablesurferApp.auth', [
  'tablesurferApp.constants',
  'tablesurferApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
