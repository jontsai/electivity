'use strict';

/* Controllers */

angular.module('myApp.controllers', ['angular-carousel']).
	controller('AppController', function($scope, $rootScope, $http, $routeParams) {

	})
	.controller('ChooseController', function() {
        console.log('Choose an activity');
    })
	.controller('CreateController', function($scope, $http, $routeParams) {
        console.log('Create something');
        $scope.type = $routeParams.type;
		$scope.createSurvey = function() {
			$http.post('/api/0/survey', $scope.form).success(
		        function(result) {
		          $scope.id = result.id;
		          $location.path('/survey/'+ $scope.type + '/' + $scope.surveyId);
		    });
		};
	})
    .controller('ShareController', function($scope, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.type = $routeParams.type;
    })
    .controller('VoteController', function ($scope, $http, $q, $timeout, $location) {
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
  	})
    .controller('ResultsController', function($scope) {
        console.log('show result');
    });
