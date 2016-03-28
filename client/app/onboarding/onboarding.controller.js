'use strict';

angular.module('tablesurferApp')
    .controller('OnboardingCtrl', function($rootScope, $scope, $state, $timeout, Auth) {

        // scope properties
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.completeRegistration = function() {
            Auth.setRegistrationCompleted(true);
            $state.go('onboarding.complete');
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
            var STEPS = ['email', 'info', 'phone', 'weekdays', 'complete'];
            var currentStep = '';
            var currentProgress = 0;

            Auth.getCurrentUser(function(currentUser) {
                console.log("currentUser: ", currentUser);
                console.log("currentUser.email: ", currentUser.email);

                if (currentUser.registrationCompleted) {
                    // COMPLETE
                    currentStep = STEPS[4];
                    currentProgress = 100;
                } else if (!currentUser.verified) {
                    // EMAIL
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
                    currentStep = STEPS[1];
                    if (!currentUser.first_name && !currentUser.last_name) {
                        // Both are missing
                        currentProgress = 30
                    } else {
                        // Either first_name or last_name is missing
                        currentProgress = 35
                    }
                } else if (!currentUser.verifiedPhone) {
                    // PHONE
                    currentStep = STEPS[2];
                    if (state === 'onboarding.phone') {
                        // user is on phone settings page
                        if (!currentUser.phone) {
                            currentProgress = 65;
                        } else {
                            currentProgress = 75;
                        }
                    } else {
                        // user is still on previous page
                        currentProgress = 55;
                    }
                } else if (currentUser.weekdays.length < 1) {
                    // WEEKDAYS
                    currentStep = STEPS[3];
                    if (state == 'onboarding.weekdays') {
                        currentProgress = 95
                    } else {
                        // user is still on previous page
                        currentProgress = 85;
                    }
                } else {
                    // DEFAULT CASE
                    currentStep = STEPS[4];
                    currentProgress = 100;
                }

                $scope.currentProgress = currentProgress;
                callback(currentStep);
            });
        };



        /*
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
                    console.log("$stateChangeStart: ", toState);
                    currentStep = getCurrentStep(toState.name);
                });

                $rootScope.$on('user:changed', function()  {
                    console.log("user changed...");
                    currentStep = getCurrentStep($state.current.name);
                });


                var currentStep = getCurrentStep();
                console.log("CURRENT STEP: ", currentStep);
                $state.go('onboarding.' + currentStep);





        /*
                function getCurrentStep() {
                    var STEPS = ["email", "info", "phone", "weekdays", "complete"];
                    var currentUser = Auth.getCurrentUser();
                  console.log("currentUser: ", currentUser);
                  console.log("$state.current.name: ", $state.current.name);
                    if (currentUser.verified == false) {
                        $scope.currentProgress = 25;
                        return STEPS[0];
                    }
                    if (!currentUser.verified) {
                        $scope.currentProgress = 15;
                        return STEPS[0];
                    }
                    if (!currentUser.first_name && !currentUser.last_name) {
                        $scope.currentProgress = 20;
                        return STEPS[1];
                    }
                    if (!currentUser.first_name ||  !currentUser.last_name) {
                        $scope.currentProgress = 35;
                        return STEPS[1];
                    }
                    if (currentUser.first_name &&  currentUser.last_name && state === 'onboarding.info') {
                        $scope.currentProgress = 45;
                        return STEPS[1];
                    }
                    if (currentUser.first_name &&  currentUser.last_name && state === 'onboarding.phone') {
                        $scope.currentProgress = 55;
                        return STEPS[2];
                    }
                    if (!currentUser.verifiedPhone) {
                        $scope.currentProgress = 65;
                        return STEPS[2];
                    }
                    if (!currentUser.weekdays && currentUser.weekdays.length < 1) {
                        return STEPS[3];
                        $scope.currentProgress = 85;

                    }
                    $scope.currentProgress = 100;
                    return STEPS[4];
                };

                /*
                $rootScope.$on('user:changed', function()  {
                    console.log("user changed...");
                    currentStep = getCurrentStep();
                });

                function getCurrentStep() {
                    var STEPS = ["email", "info", "phone", "weekdays", "complete"];
                    var currentUser = Auth.getCurrentUser();
                    if (!currentUser.verified) {
                        $scope.currentProgress = 25;
                        return STEPS[0];
                    }
                    if (!currentUser.first_name ||  !currentUser.last_name) {
                        $scope.currentProgress = 45;
                        return STEPS[1];
                    }
                    if (!currentUser.verifiedPhone) {
                        $scope.currentProgress = 65;
                        return STEPS[2];
                    }
                    if (!currentUser.weekdays && currentUser.weekdays.length < 1) {
                        return STEPS[3];
                        $scope.currentProgress = 85;

                    }
                    $scope.currentProgress = 100;
                    return STEPS[4];
                };
                */
    });
