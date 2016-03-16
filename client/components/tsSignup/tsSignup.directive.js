'use strict';

angular.module('tablesurferApp')
  .directive('tsSignup', function () {
    return {
      templateUrl: 'components/tsSignup/tsSignup.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
