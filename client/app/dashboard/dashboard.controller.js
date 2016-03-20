'use strict';

angular.module('tablesurferApp')
    .controller('DashboardCtrl', function($scope, $state, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.isEmailVerified = Auth.isEmailVerified;
        $scope.submitted = false;
        $scope.user = {};
        $scope.currentProgress = updateProgressBar();

        var errors = {};

        $scope.changeName = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changeName($scope.user.first_name, $scope.user.last_name)
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
            }
        };

        $scope.$on('user:changed', function()  {
            $scope.currentProgress = updateProgressBar();
        });


        function updateProgressBar() {
            var progress = 25;
            var currentUser = Auth.getCurrentUser();
            if (currentUser.name) {
                progress = 50;
            }
            if (currentUser.verifiedPhone == false) {
                progress = 75;
            }
            if (currentUser.verifiedPhone == true) {
                progress = 90;
            }
            return progress;
        };


    });