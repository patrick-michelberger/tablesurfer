'use strict';

angular.module('tablesurferApp')
    .controller('OnboardingCtrl', function($rootScope, $scope, $state, $timeout, Auth) {

        // scope properties
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.completeRegistration = function() {
            Auth.setRegistrationCompleted(true, function() {
                $state.go('onboarding.complete');
            });
        };

        // listeners
        $rootScope.$on('user:changed', function()  {
            updateStep($state.current.name);
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
            updateStep(toState.name);
        });

        // run
        updateStep($state.current.name, function(currentStep) {
            $state.go('onboarding.' + currentStep);
        });

        // helpers
        function updateStep(state, callback) {
            callback = callback || angular.noop;
            var STEPS = ['email', 'info', 'gender', 'phone', 'weekdays', 'complete'];
            var currentStep = '';
            var currentProgress = 0;

            Auth.getCurrentUser(function(currentUser) {
                console.log("currentUser: ", currentUser);
                console.log("currentUser.email: ", currentUser.email);

                if (currentUser.registrationCompleted) {
                    // COMPLETE
                    console.log("COMPLETE CASE");
                    currentStep = STEPS[4];
                    currentProgress = 100;
                } else if (!currentUser.verified) {
                    // EMAIL
                    console.log("EMAIL CASE");
                    currentStep = STEPS[0];
                    if (currentUser.verified == false) {
                        // email verification code sent
                        currentProgress = 25;
                    } else {
                        // email verification code not sent
                        currentProgress = 15;
                    }
                } else if (!currentUser.first_name || !currentUser.last_name) {
                    // INFO
                    console.log("INFO CASE");
                    currentStep = STEPS[1];
                    if (!currentUser.first_name && !currentUser.last_name) {
                        // Both are missing
                        currentProgress = 30
                    } else {
                        // Either first_name or last_name is missing
                        currentProgress = 35
                    }
                } else if (!currentUser.gender) {
                    // GENDER
                    console.log("GENDER CASE");
                    currentStep = STEPS[2];
                    currentProgress = 45;    
                } else if (!currentUser.verifiedPhone) {
                    // PHONE
                    console.log("PHONE CASE");
                    currentStep = STEPS[3];
                    if (state === 'onboarding.phone') {
                        // user is on gender settings page
                        if (!currentUser.phone) {
                            currentProgress = 65;
                        } else {
                            currentProgress = 75;
                        }
                    } else {
                        // user is still on previous page
                        currentProgress = 55;
                    }
                } else if (!currentUser.registrationCompleted) {
                    // WEEKDAYS
                    console.log("WEEKDAYS CASE");
                    currentStep = STEPS[4];
                    if (state == 'onboarding.weekdays') {
                        currentProgress = 95
                    } else {
                        // user is still on previous page
                        currentProgress = 85;
                    }
                } else {
                    // DEFAULT CASE
                    console.log("DEFAULT CASE");
                    currentStep = STEPS[5];
                    currentProgress = 100;
                }

                $scope.currentProgress = currentProgress;
                callback(currentStep);
            });
        };
    });
