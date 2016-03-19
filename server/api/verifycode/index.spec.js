'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var verifycodeCtrlStub = {
  index: 'verifycodeCtrl.index',
  show: 'verifycodeCtrl.show',
  create: 'verifycodeCtrl.create',
  update: 'verifycodeCtrl.update',
  destroy: 'verifycodeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var verifycodeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './verifycode.controller': verifycodeCtrlStub
});

describe('Verifycode API Router:', function() {

  it('should return an express router instance', function() {
    verifycodeIndex.should.equal(routerStub);
  });

  describe('GET /api/verifycodes', function() {

    it('should route to verifycode.controller.index', function() {
      routerStub.get
        .withArgs('/', 'verifycodeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/verifycodes/:id', function() {

    it('should route to verifycode.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'verifycodeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/verifycodes', function() {

    it('should route to verifycode.controller.create', function() {
      routerStub.post
        .withArgs('/', 'verifycodeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/verifycodes/:id', function() {

    it('should route to verifycode.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'verifycodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/verifycodes/:id', function() {

    it('should route to verifycode.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'verifycodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/verifycodes/:id', function() {

    it('should route to verifycode.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'verifycodeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
