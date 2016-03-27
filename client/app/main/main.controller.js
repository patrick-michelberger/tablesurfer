'use strict';

angular.module('tablesurferApp')
    .controller('MainCtrl', function($rootScope, $scope, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.innerHeight = window.innerHeight - 50;

        $scope.howToModal = false;

        $scope.openHowToModal = function() {
            $rootScope.Ui.turnOn('howToModal');

        };
    });
