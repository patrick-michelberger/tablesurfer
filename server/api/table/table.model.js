'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TableSchema = new Schema({
  
	/*
	* Changeable by host
	*/
  "time" : Date,
	"address" : {
		"latitude" : String,
		"longitude" : String,
		"postalcode" : String,
		"searchTerm" : String,
		"street" : String,
		"street_number" : String
	},
  
  /*
   * Changeable in the future
   * e.g. assign new host
   */
  "host": {
		"type": mongoose.Schema.Types.ObjectId, 
		"ref": "User",
	},
	"guests": [{
		"type": mongoose.Schema.Types.ObjectId, 
		"ref": "User"
	}],
  
  "day": String,
	"city": {
		"type": mongoose.Schema.ObjectId,
		"ref" : "City"
	},
});

module.exports = mongoose.model('Table', TableSchema);
