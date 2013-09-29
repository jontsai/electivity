'use strict';

/* Controllers */

angular.module('myApp.controllers', ['angular-carousel', 'firebase']).
	controller('AppController', function($scope, $rootScope, $http, $routeParams) {

	})
	.controller('ChooseController', function() {
        console.log('Choose an activity');
    })
	.controller('CreateController', function($scope, $http, $routeParams, $location) {
        console.log('Create something');
        $scope.form = { type: $routeParams.type, message: 'Where do you want to go tonight?'};
		$scope.createSurvey = function() {
			$http.post('/api/0/survey', $scope.form).success(
		        function(result) {
		          $scope.id = result.id;
		          $location.path('/survey/'+ $routeParams.type + '/' + $scope.id + '/share');
		    });
		};
	})
    .controller('ShareController', function($scope, $routeParams, angularFire) {
        $scope.survey = { message: 'Waiting'};
        var ref = new Firebase("https://teamwinit.firebaseio.com/survey/"+$routeParams.id);
        angularFire(ref, $scope, "survey");
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
