'use strict';

describe('Directive: tsPhone', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsPhone/tsPhone.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-phone></ts-phone>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsPhone directive');
  }));
});
