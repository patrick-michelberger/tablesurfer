#!/usr/bin/env node

"use strict";

var async = require('async');

var mongoURI = 'mongodb://heroku:zG2Mp1L5mfVS5p3yiOyB3MQg99bMmreeuHolV_cWyZdstXxTEOr3QxUziUqs3EEXz-47ohjiK468Xk1lYPERMw@lamppost.3.mongolayer.com:10337,lamppost.2.mongolayer.com:10381/app33601854';
var mongoose = require('mongoose');
mongoose.connect(mongoURI);

var University = require('../server/api/university/university.model');
var City = require('../server/api/city/city.model');


City.find({}).exec(function(err, cities) {
    if (err) {
        console.log("Error: ", err);
    } else {
        async.each(cities, function(city, callback) {
            University.find({
                city: city.name
            }).exec(function(err, universities) {
                if (err) {
                    console.log("err: ", err);
                    process.exit(0);
                } else {
                    city.universities = universities;
                    city.save(function(err) {
                        if (err) {
                            console.log("err: ", err);
                        }
                        callback();
                    });
                }
            });
        }, function() {
            console.log("all cities checked");
            process.exit(0);
        });
    }
});
