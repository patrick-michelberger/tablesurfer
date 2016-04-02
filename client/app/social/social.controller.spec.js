'use strict';

describe('Component: SocialComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var SocialComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SocialComponent = $componentController('SocialComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
