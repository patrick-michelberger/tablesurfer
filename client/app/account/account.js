'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('logout', {
                url: '/logout?referrer',
                referrer: 'main',
                template: '',
                controller: function($state, Auth) {
                    var referrer = $state.params.referrer ||
                        $state.current.referrer ||
                        'main';
                    Auth.logout();
                    $state.go(referrer);
                }
            })
            .state('signup', {
                url: '/signup?email',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsController',
                controllerAs: 'vm',
                authenticate: true
            })
            .state('forgotpassword', {
                url: '/forgotpassword',
                templateUrl: 'app/account/forgotPassword/forgotPassword.html',
                controller: 'ForgotPasswordCtrl'
            })
            .state('resetpassword', {
                url: '/resetpassword/:forgotpasswordcode',
                templateUrl: 'app/account/forgotPassword/resetPassword.html',
                controller: 'ForgotPasswordCtrl'
            });
    })
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.authenticate) {
                next.referrer = current.name;
            }
        });
    });
