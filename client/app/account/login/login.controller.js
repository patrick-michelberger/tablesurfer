'use strict';

class LoginController {
    constructor(Auth, $state, $scope, $rootScope, $http) {
        this.user = {};
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.errors = {};
        this.submitted = false;
        this.resetPassword = false;

        this.Auth = Auth;
        this.$state = $state;
    }

    openModal() {
        this.$rootScope.Ui.turnOn('resetPassword');
    }

    login() {
        this.submitted = true;

        if (this.$scope.form.$valid) {
            this.Auth.login({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Logged in, redirect to home
                    this.submitted = false;
                    this.$state.go('dashboard');
                })
                .catch(err => {
                    this.submitted = false
                    this.errors.other = err.message;
                });
        }
    }

    forgotpassword(form) {
        console.log("forgotpasswordcode: ", form);

        this.status = 'submitted'

        console.log("forgotpassword: ", form);

        if (form.$valid) {
            this.status = 'sending';

            $http.post('/api/passwords', { email: this.email }).then(function() {
                    this.status = 'success';
                })
                .catch(function(err) {
                    console.log(err);
                    this.status = 'error';
                });

        }
    }

}

angular.module('tablesurferApp')
    .controller('LoginController', LoginController);
