'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                data: {
                    hideTitle: true
                },
                views: {
                    "": {
                        templateUrl: 'app/main/main.html',
                        controller: 'MainCtrl'
                    }
                }
            });
    });
