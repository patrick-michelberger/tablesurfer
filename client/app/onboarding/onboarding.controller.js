'use strict';

angular.module('tablesurferApp')
    .controller('OnboardingCtrl', function($rootScope, $scope, $state, $timeout, Auth) {

        var currentStep = getCurrentStep();
        $scope.getCurrentUser = Auth.getCurrentUser;
        $state.go('onboarding.' + currentStep);

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

        /*
        function updateStatus() {
            $scope.status = STEPS[getCurrentIndex()];
        };

        function updateStatus() {
            $scope.status = STEPS[getCurrentIndex()];
        };

        function getCurrentIndex() {
            var currentUser = Auth.getCurrentUser();
            if (!currentUser.verified) {
                return 0;
            }
            if (!currentUser.first_name ||  !currentUser.last_name) {
                return 1;
            }
            if (!currentUser.verifiedPhone) {
                return 2;
            }
            if (!currentUser.weekdays && currentUser.weekdays.length < 1) {
                return 3
            }
            return 4;
        };

        function updateProgress() {
            var currentUser = Auth.getCurrentUser();
            var STATUS = STEPS[currentIndex];
            if (STATUS == 'EMAIL') {
                $scope.currentProgress = 20;
            } else if (STATUS == 'PERSONAL_INFO') {
                $scope.currentProgress = 40;
            } else if (STATUS == 'PHONE') {
                $scope.currentProgress = 60;
            } else if (STATUS == 'DATES') {
                $scope.currentProgress = 80;
            } else if (STATUS == 'COMPLETED') {
                $scope.currentProgress = 100;
            }
            console.log("progress: ", $scope.currentProgress);
        };


        function getStatus() {
            return STEPS[getCurrentIndex()];
        };


        $scope.back = function() {
            currentIndex = currentIndex - 1;
            $scope.status = STEPS[currentIndex];
            updateProgress();
        };

        $scope.next = function() {
            currentIndex = currentIndex + 1;
            $scope.status = STEPS[currentIndex];
            updateProgress();
        };

        updateProgress();
        */

    });
