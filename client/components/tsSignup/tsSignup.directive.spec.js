'use strict';

describe('Directive: tsSignup', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp.tsSignup'));
  beforeEach(module('components/tsSignup/tsSignup.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-signup></ts-signup>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsSignup directive');
  }));
});
