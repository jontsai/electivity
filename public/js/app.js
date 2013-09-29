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
      templateUrl: 'templates/choose-screen',
      controller: 'IndexController'
    }).
    when('/survey/:type',
      {
        templateUrl:'templates/create-survey',
        controller: 'CreateController'
      }
    ).
    when('/select',{
      templateUrl:'templates/activity_items',
      controller: 'ItemsController'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
