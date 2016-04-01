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

// Get list of citys
exports.index = function(req, res) {
  City.find({}).exec(function (err, citys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(citys);
  });
};

// Get a single city
exports.show = function(req, res) {
  City.findById(req.params.id).exec(function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.status(404).send('Not Found'); }
    return res.json(city);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}