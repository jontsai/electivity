'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppController', function($scope, $rootScope, $http) {
    //parent controller
  }).
  controller('IndexController', function ($scope, $http) {
    $http.get('/api/0/messages').
    success(function (data) {
      $scope.messages = data;
      console.log(data);
    });
  }).
  controller('ViewController', function ($scope, $http, $routeParams) {
    $http.get('/api/0/messages/'+$routeParams.id).
    success(function (data) {
      $scope.message = data;
    });

  }).
  controller('IndexController2', function ($scope, $http) {
    var elem = document.getElementById('mySwipe');
    window.mySwipe = Swipe(elem, {
      startSlide: 4,
      //auto: 3000,
      continuous: true,
      disableScroll: true,
      stopPropagation: true,
      callback: function(index, element) {},
      transitionEnd: function(index, element) {}
    });
    $http.get('/api/0/messages').
    success(function (data) {
      $scope.messages = data;
      console.log(data);
    });
  });
