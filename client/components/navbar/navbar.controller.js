'use strict';

class NavbarController {
    isCollapsed = true;
    //end-non-standard

    constructor(Auth, gettextCatalog) {
    	this.gettextCatalog = gettextCatalog;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
    }

    changeLanguage(code) {
        this.gettextCatalog.setCurrentLanguage(code);
    }

}

NavbarController.$inject = ['gettextCatalog'];

angular.module('tablesurferApp')
    .controller('NavbarController', NavbarController);
