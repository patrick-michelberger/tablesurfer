/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pictures              ->  index
 * POST    /api/pictures              ->  create
 * GET     /api/pictures/:id          ->  show
 * PUT     /api/pictures/:id          ->  update
 * DELETE  /api/pictures/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Picture from './picture.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Pictures
export function index(req, res) {
    return Picture.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}
