'use strict';

class LoginController {
    constructor(Auth, $state, $scope, $rootScope, $http, $timeout) {
        this.user = {};
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$http = $http;
        this.errors = {};
        this.submitted = false;
        this.resetPassword = false;

        this.Auth = Auth;
        this.$state = $state;
        this.status = 'notsubmitted';
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

    openModal() {
        this.$rootScope.Ui.turnOn('forgotPassword');
    }

    forgotpassword(form) {
        var self = this;
        this.status = 'submitted'
        if (form.$valid) {
            this.status = 'sending';


            self.$timeout(function() {
                self.$http.post('/api/passwords', { email: self.email }).then(function() {
                        self.status = 'success';
                    })
                    .catch(function(err) {
                        console.log("Error: ", err);
                        self.status = 'error';
                    });
            }, 600);

        }
    }

}

angular.module('tablesurferApp')
    .controller('LoginController', LoginController);
