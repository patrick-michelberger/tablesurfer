'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pictureCtrlStub = {
  index: 'pictureCtrl.index',
  show: 'pictureCtrl.show',
  create: 'pictureCtrl.create',
  update: 'pictureCtrl.update',
  destroy: 'pictureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pictureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './picture.controller': pictureCtrlStub
});

describe('Picture API Router:', function() {

  it('should return an express router instance', function() {
    pictureIndex.should.equal(routerStub);
  });

  describe('GET /api/pictures', function() {

    it('should route to picture.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pictureCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/pictures/:id', function() {

    it('should route to picture.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pictureCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/pictures', function() {

    it('should route to picture.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pictureCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/pictures/:id', function() {

    it('should route to picture.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'pictureCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/pictures/:id', function() {

    it('should route to picture.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'pictureCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/pictures/:id', function() {

    it('should route to picture.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pictureCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
