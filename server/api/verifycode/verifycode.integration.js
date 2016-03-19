'use strict';

var app = require('../../../server');
import request from 'supertest';

var newVerifycode;

describe('Verifycode API:', function() {

  describe('GET /api/verifycodes', function() {
    var verifycodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/verifycodes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          verifycodes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      verifycodes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/verifycodes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/verifycodes')
        .send({
          name: 'New Verifycode',
          info: 'This is the brand new verifycode!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVerifycode = res.body;
          done();
        });
    });

    it('should respond with the newly created verifycode', function() {
      newVerifycode.name.should.equal('New Verifycode');
      newVerifycode.info.should.equal('This is the brand new verifycode!!!');
    });

  });

  describe('GET /api/verifycodes/:id', function() {
    var verifycode;

    beforeEach(function(done) {
      request(app)
        .get('/api/verifycodes/' + newVerifycode._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          verifycode = res.body;
          done();
        });
    });

    afterEach(function() {
      verifycode = {};
    });

    it('should respond with the requested verifycode', function() {
      verifycode.name.should.equal('New Verifycode');
      verifycode.info.should.equal('This is the brand new verifycode!!!');
    });

  });

  describe('PUT /api/verifycodes/:id', function() {
    var updatedVerifycode;

    beforeEach(function(done) {
      request(app)
        .put('/api/verifycodes/' + newVerifycode._id)
        .send({
          name: 'Updated Verifycode',
          info: 'This is the updated verifycode!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVerifycode = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVerifycode = {};
    });

    it('should respond with the updated verifycode', function() {
      updatedVerifycode.name.should.equal('Updated Verifycode');
      updatedVerifycode.info.should.equal('This is the updated verifycode!!!');
    });

  });

  describe('DELETE /api/verifycodes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/verifycodes/' + newVerifycode._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when verifycode does not exist', function(done) {
      request(app)
        .delete('/api/verifycodes/' + newVerifycode._id)
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
