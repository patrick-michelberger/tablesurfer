'use strict';

angular.module('tablesurferApp')
  .directive('tsPhone', function (Auth, $http, $timeout, $rootScope) {
    return {
      templateUrl: 'components/tsPhone/tsPhone.html',
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {

        var currentUser = scope.currentUser = Auth.getCurrentUser();

        scope.hasPhonecode = function() {
          if (currentUser.verifiedPhone === false) {
            return true;
          } else {
            return false;
          }
        };

        scope.hasPhone = function() {
          return (!currentUser.phone || currentUser.phone.length < 1 || !currentUser.verifiedPhone) ? false : true;
        };

        // ACTIONS
      	scope.saveNumber = function() {
          scope.isLoading = true;
      		Auth.changePhone(scope.currentUser.phone)
	        .then( function(user) {
            scope.isLoading = false;
            Auth.currentUser
	        	scope.phoneChanged = true;
	        	$timeout(function() {
	        		scope.phoneChanged = false;
	        	}, 1500);
	        })
      	};

        scope.submit = function() {
          scope.isLoading = true;

          Auth.verifyPhone(scope.currentUser.phonecode).then(function(response) {

            scope.isLoading = false;
            scope.currentUser.verifiedPhone = true;

          }).catch(function(err) {

            scope.isLoading = false;
            scope.hasError = true;
            delete scope.currentUser.phonecode;

            $timeout(function() {
              scope.hasError = false;
            }, 1500);

          });

        };

        scope.changeNumber = function() {
          delete scope.currentUser.phone;
          delete scope.currentUser.verifiedPhone;
        };
      }
    };
  });