'use strict';

angular.module('tablesurferApp')
    .directive('tsPhoto', function(Auth, $timeout, Upload, $http) {
        return {
            templateUrl: 'components/tsPhoto/tsPhoto.html',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                scope.getCurrentUser = Auth.getCurrentUser;

                scope.upload = function(dataUrl, name) {
                    var currentUser = Auth.getCurrentUser();


                    $http.post('/api/users/' + currentUser._id + '/picture', {
                        picture: dataUrl
                    });

                    /*
                    Upload.upload({
                        url: '/api/users/' + currentUser._id + '/picture',
                        data: {
                            picture: dataUrl
                        },
                    }).then(function(response) {
                        $timeout(function() {
                            scope.result = response.data;
                        });
                    }, function(response) {
                        if (response.status > 0) scope.errorMsg = response.status + ': ' + response.data;
                    }, function(evt) {
                        scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    });


                    /*
                                            data: {
                            picture: Upload.dataUrltoBlob(dataUrl, name)
                        },
                        */

                }
            }
        };
    });
