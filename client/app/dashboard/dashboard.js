'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                authenticate: 'true',
                data: {
                    hideFooter: true
                },
                views: {
                    "": {
                        templateUrl: 'app/dashboard/dashboard.html',
                        controller: 'DashboardCtrl'
                    }
                }
            });
    });
