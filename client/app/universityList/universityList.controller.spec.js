'use strict';

describe('Component: UniversityListComponent', function () {

  // load the controller's module
  beforeEach(module('tablesurferApp'));

  var UniversityListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UniversityListComponent = $componentController('UniversityListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
