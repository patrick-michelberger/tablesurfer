'use strict';

class LoginController {
    constructor(Auth, $state, $scope) {
        this.user = {};
        this.$scope = $scope;
        this.errors = {};
        this.submitted = false;

        this.Auth = Auth;
        this.$state = $state;
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
}

angular.module('tablesurferApp')
    .controller('LoginController', LoginController);
