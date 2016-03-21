'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UniversitySchema = new Schema({
    "name": String,
    "web_page": String,
    "country": String,
    "domain": String
}, {
    collection: 'universities'
});

module.exports = mongoose.model('University', UniversitySchema);