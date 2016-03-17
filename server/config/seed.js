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
var User = require('../api/user/user.model');

University.find({}).remove(function() {
    University.create({
        "name": "LMU München",
        "campusMails": ["lmu.de"]
    }, {
        "name": "TU München",
        "campusMails": ["tum.de"]
    }, {
        "name": "Universität Hamburg",
        "campusMails": ["uh.edu"]
    }, function(err, LMU, TUM, UH) {
        City.find({}).remove(function() {
            City.create({
                    "name": "Munich",
                    "latitude": "48.8",
                    "longitude": "11.35",
                    "universities": [LMU, TUM]
                }, {
                    "name": "Hamburg",
                    "latitude": "53.33",
                    "longitude": "10.2",
                    "universities": [UH]
                },
                function(err, Munich, Hamburg) {

                });
        });
    });
});

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function() {
        console.log('finished populating users');
    });
});
