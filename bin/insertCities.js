#!/usr/bin/env node

"use strict";

var mongoURI = 'mongodb://localhost/tablesurfer-dev';
var mongoose = require('mongoose');
mongoose.connect(mongoURI);

var City = require('../server/api/city/city.model');
var cities = require('../university-domains-list/cities.json');

console.log("inserting cities...");
City.find({}).remove(function() {
   City.create(cities, function(err) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log(cities.length + " cities inserted.");
        }
        process.exit(0);
    });
});