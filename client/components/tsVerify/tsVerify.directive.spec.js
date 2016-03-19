'use strict';

describe('Directive: tsVerify', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsVerify/tsVerify.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-verify></ts-verify>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsVerify directive');
  }));
});
