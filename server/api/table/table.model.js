'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

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
	}
});

TableSchema.pre('save', (next) => {
  var table = this;
  
  if(table.isNew) {
    notifyNewTable((err) => {
      if(err) {
        callback(err);
        return;
      }
      callback(null);
    });
  } else {
    next();
  }
});

TableSchema.methods = {
  notifyNewTable: function(callback) {
    var table = this;
    table.host.sendHostNotification((err) => {
      if(err) {
        callback(err);
        return;
      }
      notifyGuestHelper(guests, (err) => {
        if(err) {
          callback(err);
          return;
        }
        
        callback(null);
      });
    });
  }
};

var notifyGuestHelper = function(guests, callback) {
  if(guests === []) {
    callback(null);
    return;
  }
  
  var guest = _.head(guests);
  var rest = _.tail(guests);
  guest.sendGuestNotification((err) => {
    if(err) {
      callback(err);
      return;
    }
    // call recursively until all guests are notified
    notifyGuestHelper(rest, callback);
  });
};

module.exports = mongoose.model('Table', TableSchema);
