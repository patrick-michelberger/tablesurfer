'use strict';

angular.module('tablesurferApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $state, $timeout, Auth) {
        // Check if user is completely registered 
        Auth.getCurrentUser(function(currentUser) {
            if (!Auth.getCurrentUser().registrationCompleted) {
                $state.go('onboarding');
            }
        });

    });
