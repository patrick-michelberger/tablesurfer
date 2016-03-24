'use strict';

angular.module('tablesurferApp')
    .factory('Helpers', function($http) {
        var checkCampusMail = function(email, callback) {
            var regex = /(\w+\.\w+)$/;
            var match = regex.exec(email);
            if (match && match[0]) {
                var domain = match[0];
                $http.get('/api/universities?domain=' + domain).then(function(response) {
                    if (response && response.data && response.data.length > 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            } else {
                callback(false);
            }

        };

        // Public API here
        return {
            checkCampusMail: checkCampusMail
        };
    });