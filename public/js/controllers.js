'use strict';

/* Controllers */

angular.module('myApp.controllers', ['angular-carousel', 'firebase']).
    controller('AppController', function($scope, $rootScope, $http, $routeParams, $location) {

    })
    .controller('ChooseController', function() {
        console.log('Choose an activity');
    })
    .controller('CreateController', function($scope, $http, $routeParams, $location) {
        console.log('Create something');
        $scope.form = {
            type: $routeParams.type,
            limit: 20,
        };
    	$scope.createSurvey = function() {
    	    $http.post('/api/0/survey', $scope.form).success(
    		function(result) {
    		    $scope.id = result.id;
    		    $location.path('/survey/'+ $routeParams.type + '/' + $scope.id + '/share');
    		});
    	};
    })
    .controller('ShareController', function($scope, $http, $routeParams, angularFire) {
        console.log($routeParams);
        $scope.id = $routeParams.id;
        $scope.survey = {};
        var ref = new Firebase("https://teamwinit.firebaseio.com/surveys/"+$routeParams.id);
        angularFire(ref, $scope, "survey");
    })
    .controller('VoteController', function($scope, $http, $routeParams, $q, $timeout, $location) {
        $scope.items = [];
        var ref = new Firebase("https://teamwinit.firebaseio.com/surveys/"+$routeParams.id);
        ref.once('value', function(value) {
            var location = value.val().location;
            var query = value.val().query;
            $scope.limit = value.val().limit
            $http.get('/api/0/local/'+location+'/'+query + '/10').success(
                function(result) {
                  $scope.items = result;
                  $scope.item = $scope.items.shift();
            });
        })

        $scope.finished = false;

        $scope.$watch('finished', function (newValue) {
        	if (newValue === true) {
                console.log('finished has been set to true')
        		$location.path('/survey/' + $scope.surveyId + '/results');
        	}
        })

        $scope.next = function() {
            var deferred = $q.defer();
            deferred.resolve($scope.items.shift());
            return deferred.promise;
        };
    })
    .controller('ResultsController', function($scope) {
        console.log('show result');
    });
