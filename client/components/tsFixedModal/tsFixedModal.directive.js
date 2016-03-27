'use strict';

angular.module('tablesurferApp')
    .directive('tsFixedModal', function($rootElement) {
        return {
            restrict: 'C',
            link: function(scope, elem) {
                $rootElement.addClass('has-modal-fixed');
                elem.on('$destroy', function() {
                    $rootElement.removeClass('has-modal-fixed');
                });
                scope.$on('$destroy', function() {
                    $rootElement.removeClass('has-modal-fixed');
                });
            }
        };
    });
