'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('onboarding', {
                url: '/onboarding',
                authenticate: 'true',
                templateUrl: 'app/onboarding/onboarding.html',
                controller: 'OnboardingCtrl'

            })
            .state('onboarding.email', {
                url: '/email',
                authenticate: 'true',
                templateUrl: 'app/onboarding/partials/onboarding.email.html',
                reload: false
            })
            .state('onboarding.info', {
                url: '/info',
                authenticate: 'true',
                templateUrl: 'app/onboarding/partials/onboarding.info.html',
                reload: false
            })
            .state('onboarding.phone', {
                url: '/phone',
                authenticate: 'true',
                templateUrl: 'app/onboarding/partials/onboarding.phone.html',
                reload: false
            })
            .state('onboarding.weekdays', {
                url: '/weekdays',
                authenticate: 'true',
                templateUrl: 'app/onboarding/partials/onboarding.weekdays.html',
                reload: false
            })
            .state('onboarding.complete', {
                url: '/complete',
                authenticate: 'true',
                templateUrl: 'app/onboarding/partials/onboarding.complete.html',
                reload: false
            });
    });
