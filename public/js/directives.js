'use strict';

/* Directives */

angular.module('myApp.directives', [])
.directive('appVersion', function (version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
})
.directive('timer', function() {
	return {
		restrict: 'E',
      	link: function (scope, elem) {
			function countdown(value) {
				if(value <= 0){
			    	scope.finished = true;
			    	scope.$apply()
			    	return;
		    	}
		    	elem.text(value--);
		    	setTimeout(function(){ countdown(value); }, 1000);
			};
	    
	    	countdown(scope.limit)
		}
	};
});
