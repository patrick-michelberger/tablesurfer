'use strict';

var _ = require('lodash');
var Verify = require('./verifycode.model');
var Auth = require('../../auth/auth.service');
var User = require('../user/user.model');
var University = require('../university/university.model');

import config from '../../config/environment';
const Bot = require('../../webhook/bot.js');

let bot = new Bot({
    token: config.facebook.pageToken,
    verify: config.facebook.verifyToken
});

// Get list of verifys
exports.index = function(req, res) {
  Verify.find(function (err, verifys) {
    if(err) { return handleError(res, err); }
    return res.json(200, verifys);
  });
};

// Get a single verify
exports.show = function(req, res) {
  Verify.findById(req.params.id, function (err, verify) {
    if(err) { return handleError(res, err); }
    if(!verify) { return res.send(404); }
    return res.json(verify);
  });
};

// Creates a new verify in the DB.
exports.create = function(req, res) {
  console.log("POST /api/verifycodes");
  var user = req.user;
  if(!user) { return handleError(res, new Error('User not logged in.')); };
  if(user.verified) { return handleError(res, new Error('User already verified.')); }
    
  user.createVerifycode(function(err) {
    if(err) { return handleError(res, err); }
    return res.json(201);
  });
};

// Updates an existing verify in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Verify.findById(req.params.id, function (err, verify) {
    if (err) { return handleError(res, err); }
    if(!verify) { return res.send(404); }
    var updated = _.merge(verify, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, verify);
    });
  });
};

exports.use = function(req, res) {
  Verify.findById(req.params.id, function (err, verify) {
    if(err) { return handleError(res, err); }
    if(!verify) { return handleError(res, new Error('Invalid verifycode')); }

    User.findOne({verifycode: verify._id}, function(err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return handleError(res, new Error('Invalid verifycode')); }
      
      user.verified = true;
      delete user.verifycode;
      verify.usedAt = new Date();
      
      user.save(function(err) {
        if(err) { return handleError(res, err); }
        verify.save(function(err) {
          if(err) { return handleError(res, err); }
          
          if(user.messengerId) {
            // person registered with messenger
            
            // send facebook message
            bot.sendMessage(user.messengerId, {'text': 'Wir haben dich verifiziert.'}, (err) => {
              if(err) { return handleError(res, err); }
              
              let entry = 'https://m.me/tablesurfer';
              // redirect to entry point address
              console.log('Redirecting', user.messengerId, 'to', entry);
              res.redirect(entry);
            });
          } else {
            req.user = user;
            Auth.setTokenCookieWithoutRedirect(req, res);
          }
        });
      });
    });
  });
};

// Deletes a verify from the DB.
exports.destroy = function(req, res) {
  Verify.findById(req.params.id, function (err, verify) {
    if(err) { return handleError(res, err); }
    if(!verify) { return res.send(404); }
    verify.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log('Verify:', err);
  return res.send(500, err);
}