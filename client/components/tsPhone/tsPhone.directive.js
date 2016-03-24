'use strict';

angular.module('tablesurferApp')
    .directive('tsPhone', function(Auth, $http, $timeout, $rootScope) {
        return {
            templateUrl: 'components/tsPhone/tsPhone.html',
            restrict: 'E',
            scope: true,
            link: function(scope, element, attrs) {

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
                    console.log("save number...");
                    scope.isLoading = true;
                    var phone = scope.currentUser.phone;

                    // Check for German phone number
                    var regex = /49([0-9])[0-9]*/;
                    var matches = phone.match(regex);
                    if (matches && matches[1] && matches[1] === "0") {
                        scope.currentUser.phone = phone.replace('0', '');
                    }

                    Auth.changePhone(phone)
                        .then(function(user) {
                            scope.$emit('user:changed');
                            scope.isLoading = false;
                            scope.phoneChanged = true;
                            $timeout(function() {
                                scope.phoneChanged = false;
                            }, 1500);
                        });
                    
                };

                scope.submit = function() {
                    scope.isLoading = true;
                    Auth.verifyPhone(scope.currentUser.phonecode).then(function(response) {
                        scope.$emit('user:changed');
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
                    Auth.deletePhone(scope.currentUser.phone)
                        .then(function(user) {
                            scope.$emit('user:changed');
                        });
                };
            }
        };
    });