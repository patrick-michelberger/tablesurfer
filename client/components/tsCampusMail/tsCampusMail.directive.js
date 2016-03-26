'use strict';

angular.module('tablesurferApp')
    .directive('tsCampusMail', function(Helpers, Auth) {
        return {
            templateUrl: 'components/tsCampusMail/tsCampusMail.html',
            restrict: 'EA',
            scope: {},
            link: function(scope, element, attrs) {
                var email = Auth.getCurrentUser().email
                scope.user = {};
                if (email) {
                    scope.user.email = email;
                }
                scope.errors = {};
                scope.submitted = false;

                scope.changeEmail = function() {
                    scope.submitted = true;
                    if (scope.user.email) {
                        checkEmail(function(isCampusMail) {
                            if (isCampusMail && scope.form.$valid) {
                                Auth.changeEmail(scope.user.email)
                                    .then(() => {
                                        // Account created, redirect to home
                                        scope.submitted = false;
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
                    }
                };

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
