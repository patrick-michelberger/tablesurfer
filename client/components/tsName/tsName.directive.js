'use strict';

angular.module('tablesurferApp')
    .directive('tsName', function(Auth, $rootScope, $timeout) {
        return {
            templateUrl: 'components/tsName/tsName.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                var currentUser = Auth.getCurrentUser();
                var errors = {};

                scope.user = Auth.getCurrentUser();
                scope.getCurrentUser = Auth.getCurrentUser;

                scope.changeFirstName = function(form) {
                    Auth.changeFirstName(scope.user.first_name)
                        .then(() => {
                            $rootScope.$emit('user:changed');
                        })
                        .catch(err => {
                            err = err.data;
                            errors = {};

                            // Update validity of form fields that match the mongoose errors
                            angular.forEach(err.errors, (error, field) => {
                                form[field].$setValidity('mongoose', false);
                                errors[field] = error.message;
                            });
                        });

                };

                scope.changeLastName = function(form) {
                    console.log("changeLastName: ", form.lname.$valid);
                    Auth.changeLastName(scope.user.last_name)
                        .then(() => {
                            $rootScope.$emit('user:changed');
                        })
                        .catch(err => {
                            err = err.data;
                            errors = {};

                            // Update validity of form fields that match the mongoose errors
                            angular.forEach(err.errors, (error, field) => {
                                form[field].$setValidity('mongoose', false);
                                errors[field] = error.message;
                            });
                        });

                };
            }
        };
    });
