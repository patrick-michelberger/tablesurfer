'use strict';

angular.module('tablesurferApp')
    .controller('ResetPasswordCtrl', function($scope, $http, $stateParams, $location, $timeout, Auth) {

        $scope.forgotpasswordcode = $stateParams.forgotpasswordcode;

        $scope.resetpassword = function(form) {
            $scope.status = 'submitted';

            if (form.$valid) {
                $scope.status = 'sending';
                $http.put('/api/passwords/' + $scope.forgotpasswordcode, { password: $scope.password }).then(function(response) {
                        $scope.status = 'success';
                        $timeout(function() {
                            Auth.loginWithToken(response.data.token);
                            $location.path('/dashboard');
                        }, 1500);
                    })
                    .catch(function(err) {
                        $scope.status = 'error';
                    });
            }
        };
    });
