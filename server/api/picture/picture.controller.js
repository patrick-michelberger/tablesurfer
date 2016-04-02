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
import ig from 'instagram-node';
import config from '../../config/environment'

// instagram initialization
console.log("config.instagram.accessToken: ", config.instagram.accessToken);
var instagram = ig.instagram();
instagram.use({ access_token: config.instagram.accessToken });
instagram.use({
    client_id: config.instagram.clientId,
    client_secret: config.instagram.clientSecret
});

instagram.tag('tablesurfer', function(err, result, remaining, limit) {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("result: ", result);  
  }
});




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
