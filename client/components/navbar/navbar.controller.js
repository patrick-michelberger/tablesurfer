'use strict';

class NavbarController {
    isCollapsed = true;
    //end-non-standard

    constructor(Auth, gettextCatalog) {
        this.gettextCatalog = gettextCatalog;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.currentLanguage = this.gettextCatalog.getCurrentLanguage();
    }

    changeLanguage(code) {
        this.gettextCatalog.setCurrentLanguage(code);
        console.log("currentLanguage: ", this.gettextCatalog.getCurrentLanguage());
        this.currentLanguage = this.gettextCatalog.getCurrentLanguage();
    }

}

NavbarController.$inject = ['Auth', 'gettextCatalog'];

angular.module('tablesurferApp')
    .controller('NavbarController', NavbarController);
