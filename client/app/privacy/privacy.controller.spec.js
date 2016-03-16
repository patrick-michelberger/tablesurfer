'use strict';

describe('Component: PrivacyComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var PrivacyComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PrivacyComponent = $componentController('PrivacyComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
