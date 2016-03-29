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
            changeEmail: {
                method: 'PUT',
                params: {
                    controller: 'email'
                }
            },
            changeWeekdays: {
                method: 'PUT',
                params: {
                    controller: 'weekdays'
                }
            },
            changeFirstName: {
                method: 'PUT',
                params: {
                    controller: 'firstname'
                }
            },
            changeGender: {
                method: 'PUT',
                params: {
                    controller: 'gender'
                }
            },
            changeLastName: {
                method: 'PUT',
                params: {
                    controller: 'lastname'
                }
            },
            setRegistrationCompleted: {
                method: 'PUT',
                params: {
                    controller: 'registration'
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
