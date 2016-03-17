'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UniversitySchema = new Schema({
    "name": String,
    "campusMails": [String]
}, {
    collection: 'universities'
});

module.exports = mongoose.model('University', UniversitySchema);
