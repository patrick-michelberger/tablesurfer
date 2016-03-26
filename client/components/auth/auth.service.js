'use strict';

(function() {

    function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
        var safeCb = Util.safeCb;
        var currentUser = {};
        var userRoles = appConfig.userRoles || [];

        if ($cookies.get('token') && $location.path() !== '/logout') {
            currentUser = User.get();
        }

        var Auth = {

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional, function(error, user)
             * @return {Promise}
             */
            login({ email, password }, callback) {
                return $http.post('/auth/local', {
                        email: email,
                        password: password
                    })
                    .then(res => {
                        $cookies.put('token', res.data.token);
                        currentUser = User.get();
                        return currentUser.$promise;
                    })
                    .then(user => {
                        safeCb(callback)(null, user);
                        return user;
                    })
                    .catch(err => {
                        Auth.logout();
                        safeCb(callback)(err.data);
                        return $q.reject(err.data);
                    });
            },

            /**
             * Delete access token and user info
             */
            logout() {
                $cookies.remove('token');
                currentUser = {};
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional, function(error, user)
             * @return {Promise}
             */
            createUser(user, callback) {
                return User.save(user,
                    function(data) {
                        $cookies.put('token', data.token);
                        currentUser = User.get();
                        return safeCb(callback)(null, user);
                    },
                    function(err) {
                        Auth.logout();
                        return safeCb(callback)(err);
                    }).$promise;
            },

            /**
             * Change first name
             *
             * @param  {String}   firstName     - user's first name,
             * @param  {Function} callback - optional, function(error, user)
             * @return {Promise}
             */
            changeFirstName(firstName, callback) {
                return User.changeFirstName({ id: currentUser._id }, {
                        firstName: firstName
                    }, function(data) {
                        currentUser.first_name = firstName;
                        return safeCb(callback)(null);
                    },
                    function(err) {
                        Auth.logout();
                        return safeCb(callback)(err);
                    }).$promise;
            },

            /**
             * Change last name
             *
             * @param  {String}   lastName      - user's last name
             * @param  {Function} callback - optional, function(error, user)
             * @return {Promise}
             */
            changeLastName(lastName, callback) {
                return User.changeLastName({ id: currentUser._id }, {
                        lastName: lastName
                    }, function(data) {
                        currentUser.last_name = lastName;
                        return safeCb(callback)(null);
                    },
                    function(err) {
                        Auth.logout();
                        return safeCb(callback)(err);
                    }).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional, function(error, user)
             * @return {Promise}
             */
            changePassword(oldPassword, newPassword, callback) {
                return User.changePassword({ id: currentUser._id }, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function() {
                    return safeCb(callback)(null);
                }, function(err) {
                    return safeCb(callback)(err);
                }).$promise;
            },

            /**
             * Gets all available info on a user
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, funciton(user)
             * @return {Object|Promise}
             */
            getCurrentUser(callback) {
                if (arguments.length === 0) {
                    return currentUser;
                }

                var value = (currentUser.hasOwnProperty('$promise')) ?
                    currentUser.$promise : currentUser;
                return $q.when(value)
                    .then(user => {
                        safeCb(callback)(user);
                        return user;
                    }, () => {
                        safeCb(callback)({});
                        return {};
                    });
            },

            /**
             * Check if a user is logged in
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            isLoggedIn(callback) {
                if (arguments.length === 0) {
                    return currentUser.hasOwnProperty('role');
                }

                return Auth.getCurrentUser(null)
                    .then(user => {
                        var is = user.hasOwnProperty('role');
                        safeCb(callback)(is);
                        return is;
                    });
            },

            /**
             * Check if a user has a specified role or higher
             *   (synchronous|asynchronous)
             *
             * @param  {String}     role     - the role to check against
             * @param  {Function|*} callback - optional, function(has)
             * @return {Bool|Promise}
             */
            hasRole(role, callback) {
                var hasRole = function(r, h) {
                    return userRoles.indexOf(r) >= userRoles.indexOf(h);
                };

                if (arguments.length < 2) {
                    return hasRole(currentUser.role, role);
                }

                return Auth.getCurrentUser(null)
                    .then(user => {
                        var has = (user.hasOwnProperty('role')) ?
                            hasRole(user.role, role) : false;
                        safeCb(callback)(has);
                        return has;
                    });
            },

            /**
             * Check if a user is an admin
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            isAdmin() {
                return Auth.hasRole
                    .apply(Auth, [].concat.apply(['admin'], arguments));
            },

            /**
             * Check if a user's email is verified
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            isVerified(callback) {
                if (arguments.length === 0) {
                    return currentUser.verified;
                }
                return Auth.getCurrentUser(null)
                    .then(user => {
                        var verified = user.verified;
                        safeCb(callback)(verified);
                        return verified;
                    });
            },

            /**
             * Check if a user's email is a campus mail
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            isCampusMail(callback) {
                if (arguments.length === 0) {
                    return currentUser.isCampusMail;
                }
                return Auth.getCurrentUser(null)
                    .then(user => {
                        var verified = user.verifiedEmail;
                        safeCb(callback)(verified);
                        return verified;
                    });
            },

            /**
             * Get auth token
             *
             * @return {String} - a token string used for authenticating
             */
            getToken() {
                return $cookies.get('token');
            },


            /**
             * Change city
             *
             * @param  {String}   city
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changeCity(city, callback) {
                var cb = callback || angular.noop;

                return User.changeCity({
                    id: currentUser._id
                }, {
                    city: city
                }, function(user) {
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Change phone number
             *
             * @param  {String}   phone number
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            changePhone(phone, callback) {
                var cb = callback || angular.noop;

                return User.changePhone({
                    id: currentUser._id
                }, {
                    phone: phone
                }, function(user) {
                    currentUser.verifiedPhone = false;
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Change email
             *
             * @param  {String}   email
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            changeEmail(email, callback) {
                var cb = callback || angular.noop;
                return User.changeEmail({
                    id: currentUser._id
                }, {
                    email: email
                }, function(user) {
                    currentUser.email = email;
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Change user's preferred weekdays
             *
             * @param  {Array}   weekdays
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            changeWeekdays(weekdays, callback) {
                var cb = callback || angular.noop;

                return User.changeWeekdays({
                    id: currentUser._id
                }, {
                    weekdays: weekdays
                }, function(user) {
                    currentUser.weekdays = weekdays;
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Delete phone number
             *
             * @param  {String}   phone number
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            deletePhone(phone, callback) {
                var cb = callback || angular.noop;

                return User.changePhone({
                    id: currentUser._id
                }, {
                    phone: phone
                }, function(user) {
                    delete currentUser.phone;
                    delete currentUser.verifiedPhone;
                    return cb(user);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             *  Verify user's phone number
             *
             * @param {String} phonecode
             * @param {Function} callback - optional
             * @return {Promise}
             */

            verifyPhone(phonecode, callback) {
                var cb = callback || angular.noop;
                return $http.get('/api/phonecodes/' + phonecode + '/used').then(function(response) {
                    if (response.data) {
                        currentUser.picture = response.data.picture;
                    }
                    return response;
                });
            },

            /**
             * Authenticate user with token and save it
             *
             * @param  {String}   token
             */
            loginWithToken(token, callback) {
                $cookies.put('token', token);
                currentUser = User.get();
            },


            /**
             * Mark user as completely registered 
             *
             * @param  {Boolean}  registrationCompleted
             * @param  {Function} callback - optional, function(error, user)
             * @return {Promise}
             */
            setRegistrationCompleted(registrationCompleted, callback) {
                return User.setRegistrationCompleted({ id: currentUser._id }, {
                        registrationCompleted: registrationCompleted
                    }, function(data) {
                        currentUser.registrationCompleted = registrationCompleted
                        return safeCb(callback)(null);
                    },
                    function(err) {
                        return safeCb(callback)(err);
                    }).$promise;
            },

        };

        return Auth;
    }

    angular.module('tablesurferApp.auth')
        .factory('Auth', AuthService);

})();
