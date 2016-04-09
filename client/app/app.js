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
        'gettext',
        'internationalPhoneNumber',
        'ui.bootstrap',
        'ui.bootstrap.progressbar',
        'ngFileUpload',
        'ngImgCrop',
        'leaflet-directive'
    ])
    .config(function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    })
    .run(function(gettextCatalog, $rootScope, $anchorScroll, $timeout, $window) {
        gettextCatalog.setCurrentLanguage('en');
        /*gettextCatalog.debug = true;*/

        // Scroll to top on each route change
        $rootScope.$on('$stateChangeSuccess', function() {
            var elem = angular.element(document.getElementById('ts-scrollable-content'));
            var scrollableContentController = elem.controller('scrollableContent');
            scrollableContentController.scrollTo(0);
        });
    })
