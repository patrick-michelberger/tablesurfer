'use strict';

angular.module('tablesurferApp')
    .directive('tsEmail', function($http) {

        var mails = [],
            regex = /@(.*)/;

        $http.get('/api/universities').success(function(universities) {
            mails = _.flatten(_.pluck(universities, 'campusMails'));
        });

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: true,
            link: function(scope, element, attrs, ngModel) {
                scope.form.isCampusMail = true;

                scope.changed = function(value) {
                    var match = regex.exec(scope.user.email);
                    if (match && match[1]) {
                        if (mails.indexOf(match[1]) > -1) {
                            scope.form.isCampusMail = true;
                            return ngModel.$setValidity('campusMail', true);
                        } else {
                            scope.form.isCampusMail = false;
                            return ngModel.$setValidity('campusMail', false);
                        }
                    }
                };

            }
        };
    });
