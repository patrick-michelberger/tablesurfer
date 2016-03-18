'use strict';

angular.module('tablesurferApp')
    .directive('tsLoading', function() {
        return {
            templateUrl: 'components/tsLoading/tsLoading.html',
            restrict: 'E',
            link: function(scope, element, attrs) {}
        };
    });
