'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppController', function($scope, $rootScope, $http) {
    //parent controller
  }).
  controller('IndexController', function ($scope, $http) {
    console.log('Choose');
  }).
  controller('ItemsController', function ($scope, $http) {
    console.log('Swipe like mad');
    $scope.msg="Yahoo Hackinz"
    //need to paste activityItemTemp
    $scope.items=[1,2,3,4];

  }).
  controller('ItemController', function ($scope, $http) {
    console.log('Choose');
  });
