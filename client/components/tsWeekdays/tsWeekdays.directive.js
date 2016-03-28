'use strict';

angular.module('tablesurferApp')
    .directive('tsWeekdays', function(Auth) {
        return {
            templateUrl: 'components/tsWeekdays/tsWeekdays.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {

                // scope propterties
                scope.weekdays = {};
                scope.preferences = [];

                scope.$watchCollection('weekdays', function() {
                    scope.preferences = [];
                    angular.forEach(scope.weekdays, function(value, key) {
                        if (value) {
                            scope.preferences.push(key);
                        }
                        Auth.changeWeekdays(scope.preferences);
                    });
                });

                scope.savePreferences = function() {
                    Auth.changeWeekdays(scope.preferences)
                        .then(() => {
                            scope.$emit('user:changed');
                        })
                        .catch(err => {
                            err = err.data;
                            console.log("Err: ", err);
                        });
                };

                // initialization
                Auth.getCurrentUser(function(currentUser) {
                    currentUser.weekdays.forEach(function(day) {
                        scope.weekdays[day] = true;
                    });
                });
            }
        };
    });
