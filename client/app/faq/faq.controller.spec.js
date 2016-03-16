'use strict';

describe('Component: FaqComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var FaqComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    FaqComponent = $componentController('FaqComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
