'use strict';

angular.module('tablesurferApp')
    .directive('tsCampusMail', function($rootScope, Helpers, Auth) {
        return {
            templateUrl: 'components/tsCampusMail/tsCampusMail.html',
            restrict: 'EA',
            scope: {},
            link: function(scope, element, attrs) {
                // scope varibales
                scope.getCurrentUser = Auth.getCurrentUser;
                scope.user = {};
                scope.errors = {};
                scope.submitted = false;
                scope.emailDisabled = false;

                scope.changeEmail = function() {
                    scope.submitted = true;
                    if (scope.user.email) {
                        checkEmail(function(isCampusMail) {
                            if (isCampusMail && scope.form.$valid) {
                                Auth.changeEmail(scope.user.email)
                                    .then(() => {
                                        scope.submitted = false;
                                        $rootScope.$emit('user:changed');
                                    })
                                    .catch(err => {
                                        err = err.data;
                                        scope.errors = {};

                                        // Update validity of form fields that match the mongoose errors
                                        angular.forEach(err.errors, (error, field) => {
                                            scope.form[field].$setValidity('mongoose', false);
                                            scope.errors[field] = error.message;
                                        });
                                    });
                            }
                        });
                    } else {
                        $rootScope.$emit('user:changed');
                    }
                };

                // initialization
                Auth.getCurrentUser(function(currentUser) {
                    if (currentUser && currentUser.email) {
                        scope.user.email = currentUser.email;
                        checkEmail();
                    }
                    if (currentUser.provider == 'local') {
                        scope.emailDisabled = true;
                    }
                });

                // helpers
                function checkEmail(callback) {
                    callback = callback || angular.noop;
                    var email = scope.user.email;
                    Helpers.checkCampusMail(email, function(isCampusMail) {
                        scope.isCampusMail = isCampusMail;
                        callback(isCampusMail);
                    });
                };
            }
        };
    });
