'use strict';

describe('Directive: tsSuccess', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsSuccess/tsSuccess.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-success></ts-success>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsSuccess directive');
  }));
});
