'use strict';

(function() {

    angular.module('tablesurferApp.auth')
        .run(function($rootScope, $state, Auth) {
            $rootScope.footer = {};
            $rootScope.title = {};

            // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
            $rootScope.$on('$stateChangeStart', function(event, next) {

                // hide static footer for mobile
                if (next.data && next.data.hideFooter) {
                    $rootScope.footer.hide = true;
                } else {
                    $rootScope.footer.hide = false;
                }

                // hide navbar title
                if (next.data && next.data.hideTitle) {
                    $rootScope.title.hide = true;
                } else {
                    $rootScope.title.hide = false;
                }

                if (!next.authenticate) {
                    return;
                }

                if (typeof next.authenticate === 'string') {
                    Auth.hasRole(next.authenticate, _.noop).then(has => {
                        if (has) {
                            return;
                        }
                        event.preventDefault();
                        return Auth.isLoggedIn(_.noop).then(is => {
                            $state.go(is ? 'dashboard' : 'login');
                        });
                    });
                } else {
                    Auth.isLoggedIn(_.noop).then(is => {
                        if (is) {
                            return;
                        }

                        event.preventDefault();
                        $state.go('main');
                    });
                }
            });
        });

})();
