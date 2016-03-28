'use strict';

angular.module('tablesurferApp')
    .directive('tsVerify', function(Auth, $rootScope, $http, $timeout, Helpers) {
        return {
            templateUrl: 'components/tsVerify/tsVerify.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                var status = 'unverified';
                scope.getStatus = function() {
                    return Auth.getCurrentUser().verified ? 'verified' : status;
                };

                scope.sendVerificationEmail = function() {
                    status = 'sending';
                    Auth.createVerificationCode(function(err) {
                        if (err) {
                            console.log(err);
                            status = 'error';
                            // reset the status, so that the user can send another email
                            $timeout(function() {
                                status = 'unverified';
                            }, 5000);
                        } else {
                            status = 'sent';
                        }
                        $rootScope.$emit('user:changed');
                     });
                };
            }
        };
    });
