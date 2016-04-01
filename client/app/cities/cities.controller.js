'use strict';


angular.module('tablesurferApp')
    .controller('CityCtrl', function($scope, $stateParams) {
    	console.log("$stateParams: ", $stateParams);
    	$scope.city = $stateParams.name || false;
    });
