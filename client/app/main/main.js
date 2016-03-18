'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    "": {
                        templateUrl: 'app/main/main.html',
                        controller: 'MainCtrl'
                    }
                }
            });
    });
