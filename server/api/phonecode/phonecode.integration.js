'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPhonecode;

describe('Phonecode API:', function() {

  describe('GET /api/phonecodes', function() {
    var phonecodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/phonecodes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          phonecodes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      phonecodes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/phonecodes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/phonecodes')
        .send({
          name: 'New Phonecode',
          info: 'This is the brand new phonecode!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPhonecode = res.body;
          done();
        });
    });

    it('should respond with the newly created phonecode', function() {
      newPhonecode.name.should.equal('New Phonecode');
      newPhonecode.info.should.equal('This is the brand new phonecode!!!');
    });

  });

  describe('GET /api/phonecodes/:id', function() {
    var phonecode;

    beforeEach(function(done) {
      request(app)
        .get('/api/phonecodes/' + newPhonecode._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          phonecode = res.body;
          done();
        });
    });

    afterEach(function() {
      phonecode = {};
    });

    it('should respond with the requested phonecode', function() {
      phonecode.name.should.equal('New Phonecode');
      phonecode.info.should.equal('This is the brand new phonecode!!!');
    });

  });

  describe('PUT /api/phonecodes/:id', function() {
    var updatedPhonecode;

    beforeEach(function(done) {
      request(app)
        .put('/api/phonecodes/' + newPhonecode._id)
        .send({
          name: 'Updated Phonecode',
          info: 'This is the updated phonecode!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPhonecode = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPhonecode = {};
    });

    it('should respond with the updated phonecode', function() {
      updatedPhonecode.name.should.equal('Updated Phonecode');
      updatedPhonecode.info.should.equal('This is the updated phonecode!!!');
    });

  });

  describe('DELETE /api/phonecodes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/phonecodes/' + newPhonecode._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when phonecode does not exist', function(done) {
      request(app)
        .delete('/api/phonecodes/' + newPhonecode._id)
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
