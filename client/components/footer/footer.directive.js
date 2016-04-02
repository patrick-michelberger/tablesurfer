'use strict';

angular.module('tablesurferApp')
    .directive('footer', function($http) {
        return {
            templateUrl: 'components/footer/footer.html',
            restrict: 'E',
            link: function(scope, element) {
                element.addClass('footer');

                $http.get('/api/universities/cities?country=Germany').success(function(cities) {
                    scope.cities = cities;
                });

                $http.get('/api/universities?country=Germany').success(function(universities) {
                    scope.universities = universities;
                });
            }
        };
    });
