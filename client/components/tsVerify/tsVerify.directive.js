'use strict';

angular.module('tablesurferApp')
    .directive('tsVerify', function(Auth, $http, $timeout, Helpers) {
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

                    $http.post('/api/verifycodes').success(function() {
                        status = 'sent';
                    }).catch(function(err) {
                        console.log(err);
                        status = 'error';

                        // reset the status, so that the user can send another email
                        $timeout(function() {
                            status = 'unverified';
                        }, 5000);
                    });

                };
            }
        };
    });
