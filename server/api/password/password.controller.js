'use strict';

var _ = require('lodash');
var Password = require('./password.model');
var User = require('../user/user.model');
var Auth = require('../../auth/auth.service');

// Get list of Passwords
exports.index = function(req, res) {
  Password.find(function (err, Passwords) {
    if(err) { return handleError(res, err); }
    return res.json(200, Passwords);
  });
};

// Get a single Password
exports.show = function(req, res) {
  Password.findById(req.params.id, function (err, Password) {
    if(err) { return handleError(res, err); }
    if(!Password) { return res.send(404); }
    return res.json(Password);
  });
};

// Creates a new forgotpassword in the DB.
exports.create = function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return handleError(res, new Error('User not found.')); }

    user.createForgotPasswordCode(function(err) {
      if(err) { return handleError(res, err); }
      return res.json(201);
    });
  });
};

// Updates an existing forgotpassword in the DB.
exports.update = function(req, res) {  
  if(req.body._id) { delete req.body._id; }
  Password.findById(req.params.id, function (err, Password) {
    if (err) { return handleError(res, err); }
    if(!Password) { return res.send(404); }
    var updated = _.merge(Password, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Password);
    });
  });
};

exports.use = function(req, res) {
  console.log("Came here with ", req.params);
  
  if(req.body._id) { delete req.body._id; }
  var newPass = String(req.body.password);
  
  Password.findById(req.params.id, function (err, forgotpassword) {
    if(err) { return handleError(res, err); }
    if(!forgotpassword) { return handleError(res, new Error('Invalid forgot password code.')); }
    
    User.findOne({ Password: forgotpassword._id }, function(err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return handleError(res, new Error('Invalid forgot password code.')); }
      
      user.password = newPass;
      delete user.Password;
      forgotpassword.usedAt = new Date();
      
      user.save(function(err) {
        if (err) return handleError(res, err);
        
        forgotpassword.save(function(err) {
          if (err) return handleError(res, err);
          
          // authenticate with new password and send new auth token
          req.user = user;
          Auth.setTokenCookieWithoutRedirect(req, res);
        });
      });
    });
  });
};

// Deletes a Password from the DB.
exports.destroy = function(req, res) {
  Password.findById(req.params.id, function (err, Password) {
    if(err) { return handleError(res, err); }
    if(!Password) { return res.send(404); }
    Password.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}