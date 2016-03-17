'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhonecodeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    code: {
        type: Number
    },
    usedAt: Date,
    phone: String
});

module.exports = mongoose.model('Phonecode', PhonecodeSchema);