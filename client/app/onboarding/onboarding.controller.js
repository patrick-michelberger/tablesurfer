'use strict';

angular.module('tablesurferApp')
    .controller('OnboardingCtrl', function($rootScope, $scope, $state, $timeout, Auth) {

        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.currentProgress = 0;

        var STEPS = ["EMAIL", "PERSONAL_INFO", "PHONE", "DATES", "COMPLETED"];
        var currentIndex = getCurrentIndex();
        $scope.status = getStatus();

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

            console.log("status: ", STATUS);

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

    });
