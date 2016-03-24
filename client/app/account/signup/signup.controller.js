'use strict';

class SignupController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $state, $stateParams, $scope, Helpers) {
        this.$scope = $scope;
        this.Auth = Auth;
        this.Helpers = Helpers;
        this.$state = $state;
        this.$scope.isCampusMail = true;
        this.$stateParams = $stateParams;
        if ($stateParams.email) {
            this.user.email = $stateParams.email;
        }
    }

    checkEmail() {
        var self = this;
        var email = this.user.email;
        this.Helpers.checkCampusMail(email, function(isCampusMail) {
            self.$scope.isCampusMail = isCampusMail;
        });
    }

    register() {
        this.submitted = true;

        if (this.$scope.form.$valid) {
            this.Auth.createUser({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Account created, redirect to home
                    this.$state.go('dashboard');
                })
                .catch(err => {
                    err = err.data;
                    this.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, (error, field) => {
                        this.$scope.form[field].$setValidity('mongoose', false);
                        this.errors[field] = error.message;
                    });
                });
        }
    }
}

angular.module('tablesurferApp')
    .controller('SignupController', SignupController);