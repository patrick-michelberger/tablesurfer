'use strict';

angular.module('tablesurferApp')
    .directive('tsSignup', function($location, $state, $stateParams, $http, Auth) {
        return {
            templateUrl: 'components/tsSignup/tsSignup.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {

                scope.user = {};
                scope.isLoggedIn = Auth.isLoggedIn;

                scope.register = function(form) {
                    var email = scope.user.email;
                    scope.submitted = true;
                    scope.isChecking = true;
                    checkCampusMail(email, function(isCampusMail) {
                        if (isCampusMail) {
                            $state.go('signup', {
                                email: email
                            });
                        }
                        scope.submitted = false;
                        scope.isChecking = false;
                    });
                };

                var checkCampusMail = function(email, callback) {
                    var regex = /@(.*)/;
                    var match = regex.exec(email);
                    if (match && match[1]) {
                        var domain = match[1];
                        $http.get('/api/universities?domain=' + domain).then(function(response) {
                            if (response && response.data && response.data.length > 0) {
                                $state.go('signup', {
                                    email: email
                                });
                                callback(true);

                            } else {
                                callback(false);
                            }
                        });
                    } else {
                        callback(false);
                    }
                };
            }
        };
    });