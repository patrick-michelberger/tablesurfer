'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPassword;

describe('Password API:', function() {

  describe('GET /api/passwords', function() {
    var passwords;

    beforeEach(function(done) {
      request(app)
        .get('/api/passwords')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          passwords = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      passwords.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/passwords', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/passwords')
        .send({
          name: 'New Password',
          info: 'This is the brand new password!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPassword = res.body;
          done();
        });
    });

    it('should respond with the newly created password', function() {
      newPassword.name.should.equal('New Password');
      newPassword.info.should.equal('This is the brand new password!!!');
    });

  });

  describe('GET /api/passwords/:id', function() {
    var password;

    beforeEach(function(done) {
      request(app)
        .get('/api/passwords/' + newPassword._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          password = res.body;
          done();
        });
    });

    afterEach(function() {
      password = {};
    });

    it('should respond with the requested password', function() {
      password.name.should.equal('New Password');
      password.info.should.equal('This is the brand new password!!!');
    });

  });

  describe('PUT /api/passwords/:id', function() {
    var updatedPassword;

    beforeEach(function(done) {
      request(app)
        .put('/api/passwords/' + newPassword._id)
        .send({
          name: 'Updated Password',
          info: 'This is the updated password!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPassword = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPassword = {};
    });

    it('should respond with the updated password', function() {
      updatedPassword.name.should.equal('Updated Password');
      updatedPassword.info.should.equal('This is the updated password!!!');
    });

  });

  describe('DELETE /api/passwords/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/passwords/' + newPassword._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when password does not exist', function(done) {
      request(app)
        .delete('/api/passwords/' + newPassword._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
