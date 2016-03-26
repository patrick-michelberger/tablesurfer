'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('onboarding', {
                url: '/onboarding',
                abstract: true,
                authenticate: 'true',
                templateUrl: 'app/onboarding/onboarding.html',
                controller: 'OnboardingCtrl'

            })
            .state('onboarding.email', {
                url: '/email',
                templateUrl: 'app/onboarding/onboarding.email.html',
                reload: false
            })
            .state('onboarding.info', {
                url: '/info',
                templateUrl: 'app/onboarding/onboarding.info.html',
                reload: false
            })
            .state('onboarding.phone', {
                url: '/phone',
                templateUrl: 'app/onboarding/onboarding.phone.html',
                reload: false
            })
            .state('onboarding.weekdays', {
                url: '/weekdays',
                templateUrl: 'app/onboarding/onboarding.weekdays.html',
                reload: false
            })
            .state('onboarding.complete', {
                url: '/complete',
                templateUrl: 'app/onboarding/onboarding.complete.html',
                reload: false
            });
    });
