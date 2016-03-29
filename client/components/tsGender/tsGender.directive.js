'use strict';

angular.module('tablesurferApp')
    .directive('tsGender', function(Auth) {
        return {
            templateUrl: 'components/tsGender/tsGender.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {

                scope.user = {};

                scope.$watch('user.gender', function() {
                	var gender = scope.user.gender;
                    if (gender) {
                    	Auth.changeGender(gender);
                    }
                });


            }
        };
    });
