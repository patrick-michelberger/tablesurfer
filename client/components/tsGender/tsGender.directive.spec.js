'use strict';

describe('Directive: tsGender', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsGender/tsGender.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-gender></ts-gender>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsGender directive');
  }));
});
