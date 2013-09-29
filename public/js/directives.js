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
  })
.directive('leaderboard', function() {
  return function(scope, element, attrs) {
   var LEADERBOARD_SIZE = 5;

  // Create our Firebase reference
  var scoreListRef = new Firebase('https://r4647oys5ai.firebaseio-demo.com//scoreList');
//https://teamwinit.firebaseio.com//scoreList
  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
  var htmlForPath = {};

  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.name()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
    }
  }

  // Helper function to handle a score object being removed; just removes the corresponding table row.
  function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.name()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.name()];
  }

  // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
  var scoreListView = scoreListRef.limit(LEADERBOARD_SIZE);

  // Add a callback to handle when a new score is added.
  scoreListView.on('child_added', function (newScoreSnapshot, prevScoreName) {
    handleScoreAdded(newScoreSnapshot, prevScoreName);
  });

  // Add a callback to handle when a score is removed
  scoreListView.on('child_removed', function (oldScoreSnapshot) {
    handleScoreRemoved(oldScoreSnapshot);
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (scoreSnapshot, prevScoreName) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot, prevScoreName);
  };
  scoreListView.on('child_moved', changedCallback);
  scoreListView.on('child_changed', changedCallback);

  // When the user presses enter on scoreInput, add the score, and update the highest score.
  $("#scoreInput").keypress(function (e) {
    if (e.keyCode == 13) {
      var newScore = Number($("#scoreInput").val());
      var name = $("#nameInput").val();
      $("#scoreInput").val("");

      if (name.length === 0)
        return;

      var userScoreRef = scoreListRef.child(name);
      
      // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
      userScoreRef.setWithPriority({ name:name, score:newScore }, newScore);
    }
  });

}
}).
directive('scrollview', function() {
    return function(scope, element) {
        YUI().use(
            'scrollview',
            "node-base", "node-event-delegate", "transition", "event-move",
        function(Y) {
            function initScrollView() {
/*
                var scrollView = new Y.ScrollView({
                    id: 'scrollview',
                    srcNode: '#scrollview-content',
                    width: '300px',
                    //height: '400px',
                    flick: {
                        minDistance:10,
                        minVelocity:0.3,
                        axis: "x"
                    }
                });

                scrollView.render();

                // Prevent default image drag behavior
                scrollView.get("contentBox").delegate("mousedown", function(e) {
                    e.preventDefault();
                }, "img");
*/
                function handleItemClicked(e) {
                    var target = e.currentTarget;
                    var image = target.one('.candidate-image');
                    var body = Y.one(document.body);
                    var imgUrl = image.getAttribute('src');
                    Y.log(imgUrl);
                    body.setStyle('backgroundImage', 'url("' + imgUrl + '")');
                }

                Y.on('click', handleItemClicked, '#scrollview-content', '.candidate');
            }
            setTimeout(initScrollView, 1000);
        });
    }
});
