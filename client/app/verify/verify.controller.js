'use strict';

angular.module('tablesurferApp')
  .controller('VerifyCtrl', function ($scope, $http, $stateParams, $location, $timeout, Auth) {
    if($stateParams.verifycode) {
      $scope.verifycode = $stateParams.verifycode;
    } else {
      $scope.status = 'enterVerifycode';
    }
    
    $scope.verify = function(form) {
      $scope.status = 'sending';
      
      $http.put('/api/verifycodes/'+$scope.verifycode).
        success(function(data) {
          Auth.loginWithToken(data.token);
          $scope.status = 'success';
          
          $timeout(function() {
              $location.path('/');
          }, 2000);
        })
        .catch( function(err) {
          console.log(err);
          $scope.status = 'error'
        });
    };
    
    // cast verify on startup
    if($scope.verifycode) $scope.verify();
  });