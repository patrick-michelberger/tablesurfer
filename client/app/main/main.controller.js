'use strict';

angular.module('tablesurferApp')
    .controller('MainCtrl', function($scope, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
    });
