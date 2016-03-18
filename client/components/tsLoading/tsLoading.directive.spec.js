'use strict';

describe('Directive: tsLoading', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsLoading/tsLoading.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-loading></ts-loading>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsLoading directive');
  }));
});
