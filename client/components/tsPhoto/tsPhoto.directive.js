'use strict';

angular.module('tablesurferApp')
    .directive('tsPhoto', function(Auth, $rootScope, $timeout, Upload, $http) {
        return {
            templateUrl: 'components/tsPhoto/tsPhoto.html',
            restrict: 'EA',
            link: function(scope, element, attrss) {
                scope.getCurrentUser = Auth.getCurrentUser;

                scope.upload = function(dataUrl, name) {
                    var currentUser = Auth.getCurrentUser();
                    scope.isUploading = true;

                    Auth.changePicture(dataUrl).then(function(response) {
                        scope.isUploading = false;
                        $rootScope.Ui.turnOff('uploadPictureModal');
                    }, function(response) {
                        if (response.status > 0) scope.errorMsg = response.status + ': ' + response.data;
                        scope.isUploading = false;
                    });
                }
            }
        };
    });
