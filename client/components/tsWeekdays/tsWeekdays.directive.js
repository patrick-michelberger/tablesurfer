'use strict';

angular.module('tablesurferApp')
    .directive('tsWeekdays', function() {
        return {
            templateUrl: 'components/tsWeekdays/tsWeekdays.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                scope.preferences = [];

                scope.$watchCollection('weekdays', function() {
                    scope.preferences = [];
                    angular.forEach(scope.weekdays, function(value, key) {
                        if (value) {
                            scope.preferences.push(key);
                        }
                    });
                });
            }
        };
    });