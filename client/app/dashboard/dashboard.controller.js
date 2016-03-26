'use strict';

angular.module('tablesurferApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $state, $timeout, Auth) {


        if (!Auth.getCurrentUser().registrationCompleted) {
            $state.go('onboarding');
        }

        /*
            $scope.currentProgress = updateProgressBar();

            $rootScope.$on('user:changed', function()  {
                $scope.currentProgress = updateProgressBar();
            });

            function updateProgressBar() {


                /*
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

*/

    });
