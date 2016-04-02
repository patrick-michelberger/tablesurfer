'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('citiesDetail', {
                url: '/cities/:name',
                templateUrl: 'app/cities/cities.html',
                controller: 'CityCtrl',
                data: {
                    hideFooter: true
                },
            })
            .state('cities', {
                url: '/cities',
                templateUrl: 'app/cities/cities.html',
                controller: 'CityCtrl',
                data: {
                    hideFooter: true
                }
            });
    });
