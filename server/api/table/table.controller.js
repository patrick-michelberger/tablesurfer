'use strict';

var _ = require('lodash');
var Table = require('./table.model');
var mongoose = require('mongoose');

// Get list of tables
exports.index = function(req, res) {

  var query = {};

  if (req.query.dateId) {
    query.date = mongoose.Types.ObjectId(req.query.dateId);
  }

  Table.findOne(query)
  .populate('date')
  .populate('host', 'givenName familyName university picture')
  .populate('guests', 'givenName familyName university picture')
  .exec(function (err, table) {
    if(err) { return handleError(res, err); }
    return res.json(200, table);
  });
};

// Get a single table
exports.show = function(req, res) {
  Table.findById(req.params.id, function (err, table) {
    if(err) { return handleError(res, err); }
    if(!table) { return res.send(404); }
    return res.json(table);
  });
};

// Creates a new table in the DB.
exports.create = function(req, res) {
  Table.create(req.body, function(err, table) {
    if(err) { return handleError(res, err); }
    return res.json(201, table);
  });
};

// Updates an existing table in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Table.findById(req.params.id, function (err, table) {
    if (err) { return handleError(res, err); }
    if(!table) { return res.send(404); }
    var updated = _.merge(table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, table);
    });
  });
};

exports.changeAddress = function(req, res) {
    Table.findById(req.params.id, function (err, table) {
    if (err) { return handleError(res, err); }
    if(!table||!table.host.equals(req.user._id)) { return res.send(404); }
    table.address = req.body;
    table.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, table);
    });
  });
};

exports.changeTime = function(req, res) {
    Table.findById(req.params.id, function (err, table) {
    if (err) { return handleError(res, err); }
    if(!table||!table.host.equals(req.user._id)) { return res.send(404); }
    table.time = req.body.time;
    table.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, table);
    });
  });
};

// Deletes a table from the DB.
exports.destroy = function(req, res) {
  Table.findById(req.params.id, function (err, table) {
    if(err) { return handleError(res, err); }
    if(!table) { return res.send(404); }
    table.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}