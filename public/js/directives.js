'use strict';

/* Directives */

angular.module('myApp.directives', [])
	.directive('appVersion', function (version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
	  })
  .directive('swiper', function() {
	  	return function(scope, elem) {
	  		console.log('adding swipe');
	  		console.log(elem);
	  		console.log(elem[0]);
		    window.mySwipe = Swipe(elem[0], {
		      startSlide: 2,
		      auto: 3000,
		      continuous: true,
		      disableScroll: false,
		      stopPropagation: true,
		      callback: function(index, element) {},
		      transitionEnd: function(index, element) {}
		    });
	  	};
  })
  .directive('leaderboard', function() {


  })  
  .directive('timer', function() {

  });
