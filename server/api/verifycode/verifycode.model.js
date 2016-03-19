'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VerifySchema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  usedAt: Date,
  email: String
});

module.exports = mongoose.model('Verifycode', VerifySchema);