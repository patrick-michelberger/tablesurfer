'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('universities', {
                url: '/universities',
                templateUrl: 'app/cities/cities.html',
                controller: 'CityCtrl',
                data: {
                    hideFooter: true
                }
            });
    });
