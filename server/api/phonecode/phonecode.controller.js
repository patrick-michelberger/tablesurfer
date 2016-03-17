/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/phonecodes              ->  index
 * POST    /api/phonecodes              ->  create
 * GET     /api/phonecodes/:id          ->  show
 * PUT     /api/phonecodes/:id          ->  update
 * DELETE  /api/phonecodes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Phonecode = require('./phonecode.model');
var User = require('../user/user.model');

// Get list of phonecodes
exports.index = function(req, res) {
    Phonecode.find(function(err, phonecodes) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(phonecodes);
    });
};

// Get a single phonecode
exports.show = function(req, res) {
    Phonecode.findById(req.params.id, function(err, phonecode) {
        if (err) {
            return handleError(res, err);
        }
        if (!phonecode) {
            return res.status(404).send('Not Found');
        }
        return res.json(phonecode);
    });
};

// Creates a new phonecode in the DB.
exports.create = function(req, res) {
    Phonecode.create(req.body, function(err, phonecode) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(phonecode);
    });
};

// Updates an existing phonecode in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Phonecode.findById(req.params.id, function(err, phonecode) {
        if (err) {
            return handleError(res, err);
        }
        if (!phonecode) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(phonecode, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(phonecode);
        });
    });
};

// Deletes a phonecode from the DB.
exports.destroy = function(req, res) {
    Phonecode.findById(req.params.id, function(err, phonecode) {
        if (err) {
            return handleError(res, err);
        }
        if (!phonecode) {
            return res.status(404).send('Not Found');
        }
        phonecode.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

exports.use = function(req, res) {
    Phonecode.findOne({
        code: req.params.id
    }, function(err, phonecode) {
        console.log("found phonecode: ", phonecode);
        if (err) {
            return handleError(res, err);
        }
        if (!phonecode) {
            return handleError(res, new Error('Invalid phonecode'));
        }

        User.findOne({
            phonecode: phonecode._id
        }, function(err, user) {
            console.log("found user: ", user);

            if (err) {
                return handleError(res, err);
            }
            if (!user) {
                return handleError(res, new Error('Invalid phonecode'));
            }

            user.verifiedPhone = true;
            delete user.phonecode;
            phonecode.usedAt = new Date();

            // TO DO request profile pricture
            user.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                phonecode.save(function(err) {
                    if (err) {
                        return handleError(res, err);
                    }
                    return res.send(200);
                });
            });
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}