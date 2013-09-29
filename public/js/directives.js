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
	return function(){console.log('hi leader');}
	.directive('appVersion', function (version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
	  })

})  
.directive('timer', function() {
	return (function countdown(remaining) {
    if(remaining <= 0){
        document.getElementsByClassName('timer')[0].innerHTML='RAWR TIMES UP!'
    	return true;
    }
    document.getElementsByClassName('timer')[0].innerHTML = remaining;
    setTimeout(function(){ countdown(remaining - 1); }, 1000);
})(5);
	// return function(){
	// 	console.log('hi timer');
	// 	var test2 = new Countdown( { style: "flip", time: 3600 } );
	// 	function countdownComplete(){
	// 		alert("yo");
	// 	}
	// }

});
