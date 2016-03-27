'use strict';

angular.module('tablesurferApp')
    .directive('tsSignup', function($location, $state, $rootScope, $stateParams, $http, $timeout, Auth, Helpers) {
        return {
            templateUrl: 'components/tsSignup/tsSignup.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {

                scope.user = {};
                scope.isLoggedIn = Auth.isLoggedIn;
                scope.noCampusMailHint = false;
                
                scope.register = function(form) {
                    var email = scope.user.email;
                    scope.submitted = true;
                    scope.isChecking = true;
                    $timeout(function() {
                        Helpers.checkCampusMail(email, function(isCampusMail) {
                            if (isCampusMail) {
                                $state.go('signup', {
                                    email: email
                                });
                            } else {
                                $rootScope.Ui.turnOn('noCampusMailHint');
                            }
                            scope.submitted = false;
                            scope.isChecking = false;
                        });
                    }, 500);
                };
            }
        };
    });