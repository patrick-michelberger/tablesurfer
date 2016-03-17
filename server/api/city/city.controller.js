/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cities              ->  index
 * POST    /api/cities              ->  create
 * GET     /api/cities/:id          ->  show
 * PUT     /api/cities/:id          ->  update
 * DELETE  /api/cities/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var City = require('./city.model');

var populateFields = "universities";

// Get list of citys
exports.index = function(req, res) {
  City.find({}).populate(populateFields).exec(function (err, citys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(citys);
  });
};

// Get a single city
exports.show = function(req, res) {
  City.findById(req.params.id).populate(populateFields).exec(function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.status(404).send('Not Found'); }
    return res.json(city);
  });
};

// Creates a new city in the DB.
exports.create = function(req, res) {
  City.create(req.body, function(err, city) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(city);
  });
};

// Updates an existing city in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  City.findById(req.params.id, function (err, city) {
    if (err) { return handleError(res, err); }
    if(!city) { return res.status(404).send('Not Found'); }
    var updated = _.merge(city, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(city);
    });
  });
};

// Deletes a city from the DB.
exports.destroy = function(req, res) {
  City.findById(req.params.id, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.status(404).send('Not Found'); }
    city.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}