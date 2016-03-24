'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                authenticate: 'true',
                views: {
                    "": {
                        templateUrl: 'app/dashboard/dashboard.html',
                        controller: 'DashboardCtrl'
                    },
                    'completeProfile@dashboard': {
                        templateUrl: 'app/dashboard/partials/completeProfile/completeProfile.html'
                    },
                    'welcome@dashboard': {
                        templateUrl: 'app/dashboard/partials/welcome/welcome.html'
                    }
                }
            });
    });