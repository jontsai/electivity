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
})
<<<<<<< HEAD
.directive('leaderboard', function() {
	return function(){console.log('hi leader');}
	.directive('appVersion', function (version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
	  })
})  
.directive('timer', function() {
	return function(scope){ return function countdown(remaining) {
    if(remaining <= 0){
        document.getElementsByClassName('timer')[0].innerHTML='RAWR TIMES UP! TO THE LEADRBARD'
    	setTimeout(function(){
    		//forward to leaderbord
    		//HAve var here that sets to true. Then Controller watches for true.

    	},1000);
    	return true;
    }
    document.getElementsByClassName('timer')[0].innerHTML = remaining;
    setTimeout(function(){ countdown(remaining - 1); }, 1000);
}(5);}
	// return function(){
	// 	console.log('hi timer');
	// 	var test2 = new Countdown( { style: "flip", time: 3600 } );
	// 	function countdownComplete(){
	// 		alert("yo");
	// 	}
	// }
=======
.directive('locationLookup', function() {
  	return function(scope, element, attrs) {
    	var autocomplete = new google.maps.places.Autocomplete(element[0]);

      function formatGeoInfo(place) {
        var geoInfo = { formatted: place.formatted_address, lat: place.geometry.location.mb, lon: place.geometry.location.nb },
        parts = [];
        for(var i = 0; i < place.address_components.length; i++) {
          var countryIndex = place.address_components[i].types.indexOf('country');
          var countyIndex = place.address_components[i].types.indexOf('administrative_area_level_2');
          var regionIndex = place.address_components[i].types.indexOf('administrative_area_level_1');
          var cityIndex = place.address_components[i].types.indexOf('locality');
          var localityIndex = place.address_components[i].types.indexOf('sublocality');
          if(countryIndex != -1) {
            geoInfo.country = place.address_components[i].long_name;
            parts.push(geoInfo.country);
          } else if (countyIndex != -1) {
            geoInfo.county = place.address_components[i].long_name;
            parts.push(geoInfo.county);
          } else if (regionIndex != -1) {
            geoInfo.region = place.address_components[i].long_name;
            parts.push(geoInfo.region);
          } else if (cityIndex != -1) {
            geoInfo.city = place.address_components[i].long_name;
            parts.push(geoInfo.city);
          } else if (localityIndex != -1) {
            geoInfo.locality = place.address_components[i].long_name;
            parts.push(geoInfo.locality);
          }
        }

        geoInfo.canonical = parts.join(', ');
        geoInfo.coords = geoInfo.lat + ',' + geoInfo.lon;

        console.log(geoInfo);

        return geoInfo;
      }
>>>>>>> 51e4945285fe4cd08d8ace4b229dad762696cf75

    	google.maps.event.addListener(autocomplete, 'place_changed', function() {
      		var place = autocomplete.getPlace();
          scope.form.geoinfo = formatGeoInfo(place);
    	});
  	}
  });
