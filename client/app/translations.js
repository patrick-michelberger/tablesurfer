angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('de', {"Admin":"Administrator","Hello":"Hallo","Home":"Startseite","Login":"Login","Logout":"Logout","Sign up":"Anmelden","The Cooking-Community <b>for Students!</b>":"Die Koch-Community für Studenten"});
/* jshint +W100 */
}]);