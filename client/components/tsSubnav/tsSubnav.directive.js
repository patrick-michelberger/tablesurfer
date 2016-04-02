'use strict';

angular.module('tablesurferApp')
  .directive('tsSubnav', function () {
    return {
      templateUrl: 'components/tsSubnav/tsSubnav.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
