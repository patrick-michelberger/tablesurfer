'use strict';

angular.module('tablesurferApp')
    .controller('UniversityListCtrl', function($scope, $http) {

        $http.get('/api/countries').then(function(response) {
            $scope.countries = response.data;
            console.log("countries received");
            for (var i = 0; i < $scope.countries.length; i++) {
                (function(i) {
                    $http.get('/api/universities?country=' + $scope.countries[i].name).then(function(response) {
                        $scope.countries[i].universities = response.data;
                    });
                })(i);
            }
        });

    });