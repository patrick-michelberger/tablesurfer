/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/universities              ->  index
 * POST    /api/universities              ->  create
 * GET     /api/universities/:id          ->  show
 * PUT     /api/universities/:id          ->  update
 * DELETE  /api/universities/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var University = require('./university.model');

// Get list of universitys
exports.index = function(req, res) {
    var query = {};

    if (req.query.country) {
        query.country = req.query.country;
    }

    if (req.query.domain) {
        query.domain = req.query.domain;
    }

    University.find(query, function(err, universitys) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(universitys);
    });
};

// Get list of countries
exports.indexCountries = function(req, res) {
    University.find(function(err, universities) {
        if (err) {
            return handleError(res, err);
        }
        var countries = _.uniq(_.pluck(universities, 'country'));
        return res.status(200).json(countries);
    });
};

// Get list of cities
exports.indexCities = function(req, res) {
    var query = {};
    var country = req.query.country || false;

    if (country) {
        query.country = country;
    }

    University.find(query).exec(function(err, universities) {
        if (err) {
            return handleError(res, err);
        }
        var countries = _.uniq(_.pluck(universities, 'city'));
        return res.status(200).json(countries);
    });
};


// Get a single university
exports.show = function(req, res) {
    University.findById(req.params.id, function(err, university) {
        if (err) {
            return handleError(res, err);
        }
        if (!university) {
            return res.status(404).send('Not Found');
        }
        return res.json(university);
    });
};

// Creates a new university in the DB.
exports.create = function(req, res) {
    University.create(req.body, function(err, university) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(university);
    });
};

// Updates an existing university in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    University.findById(req.params.id, function(err, university) {
        if (err) {
            return handleError(res, err);
        }
        if (!university) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(university, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(university);
        });
    });
};

// Deletes a university from the DB.
exports.destroy = function(req, res) {
    University.findById(req.params.id, function(err, university) {
        if (err) {
            return handleError(res, err);
        }
        if (!university) {
            return res.status(404).send('Not Found');
        }
        university.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
