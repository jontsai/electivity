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

    // var elem = document.getElementById('mySwipe');
    // window.mySwipe = Swipe(elem, {
    //   startSlide: 4,
    //   //auto: 3000,
    //   continuous: true,
    //   disableScroll: true,
    //   stopPropagation: true,
    //   callback: function(index, element) {},
    //   transitionEnd: function(index, element) {}
    // });
    // $scope.msg="Yahoo Hackinz"

  });
