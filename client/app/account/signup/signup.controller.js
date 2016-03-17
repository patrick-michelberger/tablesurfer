'use strict';

class SignupController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $state, $stateParams) {
        this.Auth = Auth;
        this.$state = $state;
        this.$stateParams = $stateParams;
            console.log("this.user: ", $stateParams);

        if ($stateParams.email) {
            this.user.email = $stateParams.email;
        }
    }

    register(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.createUser({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Account created, redirect to home
                    this.$state.go('main');
                })
                .catch(err => {
                    err = err.data;
                    this.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, (error, field) => {
                        form[field].$setValidity('mongoose', false);
                        this.errors[field] = error.message;
                    });
                });
        }
    }
}

angular.module('tablesurferApp')
    .controller('SignupController', SignupController);
