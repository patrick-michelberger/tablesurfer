'use strict';

describe('Component: PresseComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var PresseComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PresseComponent = $componentController('PresseComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
