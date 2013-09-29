'use strict';

/* Controllers */

angular.module('myApp.controllers', ['angular-carousel', 'firebase']).
    controller('AppController', function($scope, $rootScope, $http, $routeParams, $location) {

	// 	$scope.createSurvey = function() {
	// 		$http.post('/api/0/survey', $scope.form).success(
	// 	        function(result) {
	// 	          $scope.surveyId = result.id;
	// 	          $location.path('/survey/'+ $scope.surveyId);
	// 	    });
	// 	};
	// }).
 //  	controller('ItemsController', function ($scope, $http, $q, $timeout) {
	// 	console.log('Swipe like mad');
 //    $scope.timesUp=false;
 //    $scope.$watch('timesUp',function(){
 //      //redirect to leaderboard
 //      //$location.path('')
 //      console.log('hi almost to leaderboard')
 //    })
	// 	// infinite carousel stuff
	// 	var currentDay = (new Date()),
	// 	    colors = ['#339966', '#336699', '#cc9933', '#cc6633', '#cc3366', '#66cc33'],
	// 	    colorIndex = 0;
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
    .controller('VoteController', function($scope, $http, $routeParams, $q, $timeout, $location, angularFire) {
        $scope.items = [];
        var ref = new Firebase("https://teamwinit.firebaseio.com/surveys/"+$routeParams.id);
        angularFire(ref, $scope, "survey");

        $scope.$watch('survey', function(survey) {
            $http.get('/api/0/local/'+ survey.location +'/'+ survey.query + '/10').success(
                function(result) {
                  $scope.items = result;
                  console.log($scope.items);
                  $scope.item = $scope.items.shift();
                  console.log($scope.items.length);
            });
        });
        // ref.once('value', function(value) {
        //     var location = value.val().location;
        //     var query = value.val().query;
        //     $scope.limit = value.val().limit
        //     console.log('got response from firebase');
        //     console.log('/api/0/local/'+location+'/'+query + '/10');
        //     
        // }.bind(this));

        // $scope.finished = false;

        // $scope.$watch('finished', function (newValue) {
        // 	if (newValue === true) {
        //         console.log('finished has been set to true')
        // 		$location.path('/survey/' + $scope.surveyId + '/results');
        // 	}
        // });
        // $scope.index = 0;

        $scope.like = function(item) {
            $scope.index += 1;
            $http.post('/api/0/survey/'+$routeParams.id+'/activity/' + $scope.item.id, item).success(
                function(result) {
                    console.log('Vote submitted');
                    if($scope.items.length === 0) {
                        $location.path('/survey/' + $scope.surveyId + '/results');
                    }
                  var item = $scope.items.shift();
                  $scope.item = item;
            });
        };

        $scope.dislike = function(item) {
            $scope.index -= 1;
            var item = $scope.items.shift();
            if($scope.items.length === 0) {
                $location.path('/survey/' + $scope.surveyId + '/results');
            }
            $scope.item = item;

        };
    })
    .controller('ResultsController', function($scope) {
        console.log('show result');
    })
   ;
