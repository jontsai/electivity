'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppController', function($scope, $rootScope, $http) {
    //parent controller
  }).
  controller('IndexController', function ($scope, $http) {
    console.log('Choose');
  }).
  controller('IndexController2', function ($scope, $http) {
    console.log('Swipe like mad');
  });
