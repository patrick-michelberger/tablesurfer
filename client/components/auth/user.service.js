'use strict';

(function() {

    function UserResource($resource) {
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            changeCity: {
                method: 'PUT',
                params: {
                    controller: 'city'
                }
            },
            changePhone: {
                method: 'PUT',
                params: {
                    controller: 'phone'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
    }

    angular.module('tablesurferApp.auth')
        .factory('User', UserResource);

})();
