'use strict';

angular.module('tablesurferApp')
  .directive('tsSuccess', function () {
    return {
      templateUrl: 'components/tsSuccess/tsSuccess.html',
      restrict: 'E',
      transclude: true,
      link: function(scope, element, attrs) {
		    element.find('.succesIcon polyline').show().css('-webkit-animation-play-state', 'running').delay(1000);
      }
    };
  });