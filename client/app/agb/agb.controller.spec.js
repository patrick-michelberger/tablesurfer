'use strict';

describe('Component: AgbComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var AgbComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AgbComponent = $componentController('AgbComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
