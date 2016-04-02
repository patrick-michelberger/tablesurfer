/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var University = require('../api/university/university.model');
var City = require('../api/city/city.model');
var Country = require('../api/country/country.model');
var User = require('../api/user/user.model');

var universities = require('../../university-domains-list/germany.json');
var cities = require('../../university-domains-list/cities.json');

var countries = [{
    name: "Germany"
}, {
    name: "USA",
}, {
    name: "France"
},   {
    name: "Sweden"
}, {
    name: "China"
}, {
    name: "United Kingdom"
}, {
    name: "Italy"
}];

University.find({}).remove(function() {
    University.create(universities, function(err) {
        Country.find({}).remove(function() {
            Country.create(countries,
                function(err) {});
        });

        City.find({}).remove(function() {
            City.create(cities,
                function(err) {});
        });

    });
});

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function() {
        console.log('finished populating users');
    });
});
