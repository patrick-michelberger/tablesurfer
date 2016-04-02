'use strict';

describe('Directive: tsSubnav', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsSubnav/tsSubnav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-subnav></ts-subnav>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsSubnav directive');
  }));
});
