'use strict';

angular.module('tablesurferApp')
  .controller('ForgotPasswordCtrl', function ($scope, $http, $stateParams, $location, $timeout, Auth) {
    $scope.forgotpasswordcode = $stateParams.forgotpasswordcode;

    $scope.forgotpassword = function(form) {
      $scope.status = 'submitted'
      
      if(form.$valid) {
        $scope.status = 'sending';
      
        $http.post('/api/passwords', { email: $scope.email }).then( function() {
          $scope.status = 'success';
        })
        .catch( function(err) {
          console.log(err);
          $scope.status = 'error';
        });
        
      }
    };
    
    $scope.resetpassword = function(form) {
      $scope.status = 'submitted';

      if(form.$valid) {
        $scope.status = 'sending';
        $http.put('/api/passwords/' + $scope.forgotpasswordcode,
          { password: $scope.password }).then( function(data) {
            console.log("got token", data.token);
            
            Auth.loginWithToken(data.token);
            $scope.status = 'success';
            
            $timeout(function() {
                $location.path('/');
            }, 10000);
        })
        .catch( function(err) {
          $scope.status = 'error';
        });
      }
    };
  });