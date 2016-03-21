#!/usr/bin/env node

"use strict";

var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost/tablesurfer-dev';
var mongoose = require('mongoose');
mongoose.connect(mongoURI);

var University = require('../server/api/university/university.model');
var universitiesJSON = require('../university-domains-list/world_universities_and_domains.json');

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