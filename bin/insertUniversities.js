#!/usr/bin/env node

"use strict";

var mongoURI = 'mongodb://heroku:zG2Mp1L5mfVS5p3yiOyB3MQg99bMmreeuHolV_cWyZdstXxTEOr3QxUziUqs3EEXz-47ohjiK468Xk1lYPERMw@lamppost.3.mongolayer.com:10337,lamppost.2.mongolayer.com:10381/app33601854';
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