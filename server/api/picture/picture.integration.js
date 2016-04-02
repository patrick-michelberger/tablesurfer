'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPicture;

describe('Picture API:', function() {

  describe('GET /api/pictures', function() {
    var pictures;

    beforeEach(function(done) {
      request(app)
        .get('/api/pictures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pictures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pictures.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/pictures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pictures')
        .send({
          name: 'New Picture',
          info: 'This is the brand new picture!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPicture = res.body;
          done();
        });
    });

    it('should respond with the newly created picture', function() {
      newPicture.name.should.equal('New Picture');
      newPicture.info.should.equal('This is the brand new picture!!!');
    });

  });

  describe('GET /api/pictures/:id', function() {
    var picture;

    beforeEach(function(done) {
      request(app)
        .get('/api/pictures/' + newPicture._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          picture = res.body;
          done();
        });
    });

    afterEach(function() {
      picture = {};
    });

    it('should respond with the requested picture', function() {
      picture.name.should.equal('New Picture');
      picture.info.should.equal('This is the brand new picture!!!');
    });

  });

  describe('PUT /api/pictures/:id', function() {
    var updatedPicture;

    beforeEach(function(done) {
      request(app)
        .put('/api/pictures/' + newPicture._id)
        .send({
          name: 'Updated Picture',
          info: 'This is the updated picture!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPicture = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPicture = {};
    });

    it('should respond with the updated picture', function() {
      updatedPicture.name.should.equal('Updated Picture');
      updatedPicture.info.should.equal('This is the updated picture!!!');
    });

  });

  describe('DELETE /api/pictures/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/pictures/' + newPicture._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when picture does not exist', function(done) {
      request(app)
        .delete('/api/pictures/' + newPicture._id)
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
