'use strict';

angular.module('tablesurferApp')
    .controller('DashboardCtrl', function($scope, $state, $timeout, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.isEmailVerified = Auth.isEmailVerified;
        $scope.submitted = false;
        $scope.user = Auth.getCurrentUser() || {};
        $scope.currentProgress = updateProgressBar();


        $scope.$watch('user', function() {
            $scope.currentProgress = updateProgressBar();
        });

        var errors = {};

        $scope.changeFirstName = function(form) {
            $scope.submitted = true;
            if (form.fname.$valid) {
                Auth.changeFirstName($scope.user.first_name)
                    .then(() => {
                        $scope.currentProgress = updateProgressBar();
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
            } else {
                $scope.currentProgress = updateProgressBar();
            }
        };

        $scope.changeLastName = function(form) {
            $scope.submitted = true;
            if (form.lname.$valid) {
                Auth.changeLastName($scope.user.last_name)
                    .then(() => {
                        $scope.currentProgress = updateProgressBar();
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
            } else {
                $scope.currentProgress = updateProgressBar();
            }
        };

        $scope.$on('user:changed', function()  {
            $scope.currentProgress = updateProgressBar();
        });


        function updateProgressBar() {
            var progress = 25;
            var currentUser = Auth.getCurrentUser();
            if (currentUser.first_name || currentUser.last_name) {
                progress = 35;
            }
            if (currentUser.first_name && currentUser.last_name) {
                progress = 45;
            }
            if (currentUser.first_name && currentUser.last_name && currentUser.verified) {
                progress = 55;
            }
            if (currentUser.verifiedPhone == false) {
                progress = 75;
            }
            if (currentUser.verifiedPhone == true) {
                progress = 90;
            }
            if (currentUser.weekdays && currentUser.weekdays.length > 0) {
                progress = 100;
                if (!currentUser.registrationCompleted) {
                    $timeout(function() {
                        Auth.setRegistrationCompleted(true);
                    }, 1000);
                }
            }
            return progress;
        };


    });
