'use strict';

describe('Directive: tsNotifications', function () {

  // load the directive's module and view
  beforeEach(module('tablesurferApp'));
  beforeEach(module('components/tsNotifications/tsNotifications.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-notifications></ts-notifications>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tsNotifications directive');
  }));
});
