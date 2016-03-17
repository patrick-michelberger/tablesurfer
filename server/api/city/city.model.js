'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
	"name" : String,
	"latitude" : String,
	"longitude" : String,
	"universities" : [{
		"type": mongoose.Schema.ObjectId,
		"ref" : "University"
	}]
}, {
	collection: 'cities'
});

module.exports = mongoose.model('City', CitySchema);