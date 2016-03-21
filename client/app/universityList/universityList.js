'use strict';

angular.module('tablesurferApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('universityList', {
                url: '/universities',
                views: {
                    "": {
                        templateUrl: 'app/universityList/universityList.html',
                        controller: 'UniversityListCtrl'
                    }
                }
            });
    });