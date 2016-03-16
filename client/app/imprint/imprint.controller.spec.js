'use strict';

describe('Component: ImprintComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var ImprintComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ImprintComponent = $componentController('ImprintComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
