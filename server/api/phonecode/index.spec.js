'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var phonecodeCtrlStub = {
  index: 'phonecodeCtrl.index',
  show: 'phonecodeCtrl.show',
  create: 'phonecodeCtrl.create',
  update: 'phonecodeCtrl.update',
  destroy: 'phonecodeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var phonecodeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './phonecode.controller': phonecodeCtrlStub
});

describe('Phonecode API Router:', function() {

  it('should return an express router instance', function() {
    phonecodeIndex.should.equal(routerStub);
  });

  describe('GET /api/phonecodes', function() {

    it('should route to phonecode.controller.index', function() {
      routerStub.get
        .withArgs('/', 'phonecodeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/phonecodes/:id', function() {

    it('should route to phonecode.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'phonecodeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/phonecodes', function() {

    it('should route to phonecode.controller.create', function() {
      routerStub.post
        .withArgs('/', 'phonecodeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/phonecodes/:id', function() {

    it('should route to phonecode.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'phonecodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/phonecodes/:id', function() {

    it('should route to phonecode.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'phonecodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/phonecodes/:id', function() {

    it('should route to phonecode.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'phonecodeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
