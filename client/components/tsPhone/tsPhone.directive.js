'use strict';

angular.module('tablesurferApp')
    .directive('tsPhone', function(Auth, $http, $timeout, $rootScope) {
        return {
            templateUrl: 'components/tsPhone/tsPhone.html',
            restrict: 'E',
            scope: {},
            link: function(scope, element, attrs) {

                var currentUser = scope.currentUser = Auth.getCurrentUser();

                // scope properties
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

                scope.saveNumber = function() {
                    scope.isLoading = true;
                    var phone = scope.currentUser.phone;

                    // Check for German phone number
                    var regex = /49([0-9])[0-9]*/;
                    var matches = phone.match(regex);
                    if (matches && matches[1] && matches[1] === "0") {
                        scope.currentUser.phone = phone.replace('0', '');
                    }

                    $timeout(function() {
                        Auth.changePhone(phone)
                            .then(function(user) {
                                $rootScope.$emit('user:changed');
                                scope.phoneChanged = true;
                                scope.isLoading = false;
                                scope.phoneChanged = false;
                            });
                    }, 1000);
                };

                scope.submit = function() {
                    scope.isLoading = true;
                    $timeout(function() {
                        Auth.verifyPhone(scope.currentUser.phonecode).then(function(response) {
                            scope.isLoading = false;
                            scope.currentUser.verifiedPhone = true;
                            $rootScope.$emit('user:changed');
                        }).catch(function(err) {
                            scope.isLoading = false;
                            scope.hasError = true;
                            delete scope.currentUser.phonecode;
                            $timeout(function() {
                                scope.hasError = false;
                            }, 2000);
                        });
                    }, 1000);

                };

                scope.changeNumber = function() {
                    console.log("change number...");
                    Auth.deletePhone(scope.currentUser.phone)
                        .then(function(user) {
                            $rootScope.$emit('user:changed');
                        });
                };
            }
        };
    });
