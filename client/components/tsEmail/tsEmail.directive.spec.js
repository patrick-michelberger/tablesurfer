'use strict';

describe('Directive: tsEmail', function () {

  // load the directive's module
  beforeEach(module('tablesurferApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-email></ts-email>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tsEmail directive');
  }));
});
