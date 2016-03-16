'use strict';

angular.module('tablesurferApp', [
        'tablesurferApp.auth',
        'tablesurferApp.admin',
        'tablesurferApp.constants',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'validation.match',
        'mobile-angular-ui',
        'gettext'
    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    })
    .run(function(gettextCatalog) {
        gettextCatalog.setCurrentLanguage('de');
        gettextCatalog.debug = true;
    })
