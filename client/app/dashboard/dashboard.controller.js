'use strict';

angular.module('tablesurferApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $state, Auth) {
        // Check if user is completely registered 
        Auth.getCurrentUser(function(currentUser) {
            if (!Auth.getCurrentUser().registrationCompleted) {
                $state.go('onboarding');
            }
        });

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.uploadPicture = function() {
            $rootScope.Ui.turnOn('uploadPictureModal');
        };

    });
