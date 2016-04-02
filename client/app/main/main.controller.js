'use strict';

angular.module('tablesurferApp')
    .controller('MainCtrl', function($rootScope, $scope, $window, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.innerHeight = window.innerHeight - 50;

        $scope.howToModal = false;

        $scope.openHowToModal = function() {
            $rootScope.Ui.turnOn('howToModal');
        };

        angular.element($window).bind('resize', function() {
            $scope.innerHeight = window.innerHeight - 50;
            $scope.$apply();
        });
    });
