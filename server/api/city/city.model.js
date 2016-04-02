'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
	"name" : String,
	"latitude" : Number,
	"longitude" : Number,
	"universities": []
}, {
	collection: 'cities'
});

module.exports = mongoose.model('City', CitySchema);