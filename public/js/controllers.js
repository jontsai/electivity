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
		// $scope.createSurvey = function() {
		// 	$http.post('/api/0/survey', $scope.form).success(
		//         function(result) {
		//           $scope.surveyId = result.id;
		//           $location.path('/survey/'+ $scope.surveyId);
		//     });
		// };
	}).
  	controller('ItemsController', function ($scope, $http, $q, $timeout) {
		console.log('Swipe like mad');

		// infinite carousel stuff
		var currentDay = (new Date()),
		    colors = ['#339966', '#336699', '#cc9933', '#cc6633', '#cc3366', '#66cc33'],
		    colorIndex = 0;

		function getColor() {
		  return colors[colorIndex++ % colors.length];
		}

		function addPage() {
			console.log('addPage');
		  // generate a single page, with color and a new date
		  currentDay = new Date(currentDay.getTime() + 86400000);
		  return {
		    bg: getColor(),
		    date: currentDay
		  };
		  
		}

		$scope.page = addPage();

		$scope.getSlide = function(item, direction) {
			console.log('swiped');
			// generate a new slide
			var nextDate = new Date();
			nextDate.setTime(item.date.getTime() + (direction*86400000));
			var item = {
				bg: getColor(),
				date: nextDate
			};

			//return item;

			// sample promise
			var defer = $q.defer();

			$timeout(function() {
			  defer.resolve(item);
			}, 10);
			return defer;
		};

		$scope.increment = function(activity) {
			$http.post('/api/0/survey/'+ $scope.surveyId + '/', null).success(
		        function(result) {
		          console.log(result);
		    });
		}
  	});
