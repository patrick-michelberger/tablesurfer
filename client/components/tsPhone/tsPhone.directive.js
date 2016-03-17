'use strict';

angular.module('tablesurferApp')
  .directive('tsPhone', function (Auth, $http, $timeout, $rootScope) {
    return {
      templateUrl: 'components/tsPhone/tsPhone.html',
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {
      }
    };
  });
