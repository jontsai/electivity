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

    	google.maps.event.addListener(autocomplete, 'place_changed', function(value) {
      		var place = autocomplete.getPlace();
          scope.form.geoinfo = formatGeoInfo(place);
    	});
  	}
  });
