'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.services',
    'myApp.controllers',
    'myApp.filters',
    'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/templates/choose-screen',
      controller: 'ChooseController'
    }).
    when('/survey/:type', {
      templateUrl: '/templates/create-screen',
      controller: 'CreateController'
    }).
    when('/survey/:type/:id/share', {
      templateUrl: '/templates/share-screen',
      controller: 'ShareController'
    }).
    when('/survey/:type/:id/vote',{
      templateUrl:'/templates/vote-screen',
      controller: 'VoteController'
    }).
    when('/results',{ ///survey/:type/:id/results
      templateUrl:'/templates/results-screen',
      controller: 'ResultsController'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
