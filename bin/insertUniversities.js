#!/usr/bin/env node

"use strict";

var mongoURI = 'mongodb://localhost/tablesurfer-dev';
var mongoose = require('mongoose');
mongoose.connect(mongoURI);

var University = require('../server/api/university/university.model');
var universitiesJSON = require('../university-domains-list/germany.json');

console.log("inserting universities...");
University.find({}).remove(function() {
    University.create(universitiesJSON, function(err) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log(universitiesJSON.length + " universities inserted.");
        }
        process.exit(0);
    });
});