'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var passwordCtrlStub = {
  index: 'passwordCtrl.index',
  show: 'passwordCtrl.show',
  create: 'passwordCtrl.create',
  update: 'passwordCtrl.update',
  destroy: 'passwordCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var passwordIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './password.controller': passwordCtrlStub
});

describe('Password API Router:', function() {

  it('should return an express router instance', function() {
    passwordIndex.should.equal(routerStub);
  });

  describe('GET /api/passwords', function() {

    it('should route to password.controller.index', function() {
      routerStub.get
        .withArgs('/', 'passwordCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/passwords/:id', function() {

    it('should route to password.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'passwordCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/passwords', function() {

    it('should route to password.controller.create', function() {
      routerStub.post
        .withArgs('/', 'passwordCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/passwords/:id', function() {

    it('should route to password.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'passwordCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/passwords/:id', function() {

    it('should route to password.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'passwordCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/passwords/:id', function() {

    it('should route to password.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'passwordCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
