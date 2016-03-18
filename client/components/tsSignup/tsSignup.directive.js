'use strict';

angular.module('tablesurferApp')
    .directive('tsSignup', function($location, $state, $stateParams, Auth) {
        return {
            templateUrl: 'components/tsSignup/tsSignup.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                scope.user = {};
                scope.isLoggedIn = Auth.isLoggedIn;
                scope.register = function(form) {
                    scope.submitted = true;
                    $state.go('signup', {
                        email: scope.user.email
                    });
                };
            }
        };
    });
