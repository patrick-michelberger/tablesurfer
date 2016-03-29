'use strict';

angular.module('tablesurferApp')
    .directive('tsNotifications', function($http) {
        return {
            templateUrl: 'components/tsNotifications/tsNotifications.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                $http.get('/api/users/me/notifications').then(function(response) {
                    scope.notifications = response.data;
                });

                scope.delete = function(id) {
                    $http.delete('/api/notifications/' + id).then(function(response) {
                        scope.notifications = scope.notifications.filter(function(el) {
                            return el._id !== id;
                        });
                    });
                };
            }
        };
    });
