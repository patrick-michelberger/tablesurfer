'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('universities', {
                data: {
                    hideFooter: true
                },
                url: '/universities',
                views: {
                    "": {
                        templateUrl: 'app/universityList/universityList.html',
                        controller: 'UniversityListCtrl'
                    }
                }
            });
    });