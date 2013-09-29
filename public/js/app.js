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
    when('/select',{
      templateUrl:'templates/activity_items',
      controller: 'ItemsController'
    }).
    when('/select/item',{
      templateUrl:'templates/activity_item',
      controller: 'ItemController'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
