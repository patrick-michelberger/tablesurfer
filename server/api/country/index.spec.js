'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var countryCtrlStub = {
  index: 'countryCtrl.index',
  show: 'countryCtrl.show',
  create: 'countryCtrl.create',
  update: 'countryCtrl.update',
  destroy: 'countryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var countryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './country.controller': countryCtrlStub
});

describe('Country API Router:', function() {

  it('should return an express router instance', function() {
    countryIndex.should.equal(routerStub);
  });

  describe('GET /api/countries', function() {

    it('should route to country.controller.index', function() {
      routerStub.get
        .withArgs('/', 'countryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/countries/:id', function() {

    it('should route to country.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'countryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/countries', function() {

    it('should route to country.controller.create', function() {
      routerStub.post
        .withArgs('/', 'countryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/countries/:id', function() {

    it('should route to country.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'countryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/countries/:id', function() {

    it('should route to country.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'countryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/countries/:id', function() {

    it('should route to country.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'countryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
