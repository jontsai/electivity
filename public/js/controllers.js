'use strict';

/* Controllers */

angular.module('myApp.controllers', ['angular-carousel']).
	controller('AppController', function($scope, $rootScope, $http) {
	$scope.surveyId = undefined;
	})
	.controller('IndexController', function($scope,$http, $routeParams) {
	})
	.controller('TypeController', function($scope,$http, $routeParams) {
		$scope.type = $routeParams.type;
	})
	.controller('CreateController', function($scope, $http, $routeParams) {
		console.log('Choose');
		console.log($routeParams.type);
		$scope.type = $routeParams.type;
    
		// $scope.form = {type: 'Food', location: 'London, UK'};

		$scope.createSurvey = function() {
			$http.post('/api/0/survey', $scope.form).success(
		        function(result) {
		          $scope.surveyId = result.id;
		          $location.path('/survey/'+ $scope.surveyId);
		    });
		};
	})
    .controller('ItemsController', function ($scope, $http, $q, $timeout, $location) {
        $scope.item = {
            value: Math.random()
        };

        $scope.finished = false;
        $scope.limit = 3;

        $scope.$watch('finished', function (newValue) {
        	console.log('updated to' + newValue);
        	if (newValue === true) {
        		$location.path('/survey/' + $scope.surveyId + '/results');
        	}
        })

        $scope.next = function(item) {
            var deferred = $q.defer();
            var item = {
                value: Math.random()
            };
            deferred.resolve(item);

            return deferred.promise;
        };

        $scope.prev = function(item) {
            var deferred = $q.defer();
            var item = {
                value: Math.random()
            };
            deferred.resolve(item);

            return deferred.promise;
        };
  	});
