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
        console.log('add timer');
			function countdown(value) {
				  if(value <= 0){
			    	scope.state= 2;
			    	scope.$apply()
			    	return;
		    	}
          if (scope.state === 1) {
  		    	elem.text(value--);
            console.log(value);
          }
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

    	google.maps.event.addListener(autocomplete, 'place_changed', function() {
      		var place = autocomplete.getPlace();
          scope.form.geoinfo = formatGeoInfo(place);
    	});
  	}
  })
.directive('leaderboard', function() {
  return function(scope, element, attrs) {
   var LEADERBOARD_SIZE = 5;

  // Create our Firebase reference
  var scoreListRef = new Firebase('https://teamwinit.firebaseio.com/surveys/'+scope.survey.id+"/activities");
//https://teamwinit.firebaseio.com//scoreList
  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
  var htmlForPath = {};

  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  function handleScoreAdded(scoreSnapshot, prevScoreName) {
    // var newScoreRow = $("<tr/>");
    // newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    // newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));
    var newScoreRow = $("<li/>");
    newScoreRow.addClass('leaderboard-result');
    //var newScoreRow = $("<tr/>");
    newScoreRow.append(
      '<span>' + scoreSnapshot.val().name + '</span>');
    newScoreRow.append('<span class="right">' + scoreSnapshot.val().score + '</span>');
    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.name()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
      newScoreRow.addClass('first-place');
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
      lowerScoreRow.removeClass('first-place');
      newScoreRow.addClass('first-place');
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
}
})
.directive('d3BarChart', function () {

  // constants
  var margin = 20,
    width = 960,
    height = 500 - .5 - margin,
    color = d3.interpolateRgb("#f77", "#77f");

  return {
    restrict: 'E',
    scope: {
      dsn: '=',
    },
    link: function (scope, element, attrs) {

      // set up initial svg object
      var vis = d3.select(element[0])
        .append("svg")
          .attr("width", width)
          .attr("height", height + margin + 100);

      scope.$watch('dsn', function (newVal, oldVal) {

        // clear the elements inside of the directive
        vis.selectAll('*').remove();

        // if 'val' is undefined, exit
        if (!newVal) {
          return;
        }

        // Based on: http://mbostock.github.com/d3/ex/stack.html
        var n = newVal.length, // number of layers
            m = newVal[0].length, // number of samples per layer
            data = d3.layout.stack()(newVal);

        var mx = m,
            my = d3.max(data, function(d) {
              return d3.max(d, function(d) {
                return d.y0 + d.y;
              });
            }),
            mz = d3.max(data, function(d) {
              return d3.max(d, function(d) {
                return d.y;
              });
            }),
            x = function(d) { return d.x * width / mx; },
            y0 = function(d) { return height - d.y0 * height / my; },
            y1 = function(d) { return height - (d.y + d.y0) * height / my; },
            y2 = function(d) { return d.y * height / mz; }; // or `my` not rescale

        // Layers for each color
        // =====================

        var layers = vis.selectAll("g.layer")
            .data(data)
          .enter().append("g")
            .style("fill", function(d, i) {
              return color(i / (n - 1));
            })
            .attr("class", "layer");

        // Bars
        // ====

        var bars = layers.selectAll("g.bar")
            .data(function(d) { return d; })
          .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
              return "translate(" + x(d) + ",0)";
            });

        bars.append("rect")
            .attr("width", x({x: .9}))
            .attr("x", 0)
            .attr("y", height)
            .attr("height", 0)
          .transition()
            .delay(function(d, i) { return i * 10; })
            .attr("y", y1)
            .attr("height", function(d) {
              return y0(d) - y1(d);
            });

        // X-axis labels
        // =============

        var labels = vis.selectAll("text.label")
            .data(data[0])
          .enter().append("text")
            .attr("class", "label")
            .attr("x", x)
            .attr("y", height + 6)
            .attr("dx", x({x: .45}))
            .attr("dy", ".71em")
            .attr("text-anchor", "middle")
            .text(function(d, i) {
              return d.score;
            });

        // Chart Key
        // =========

        var keyText = vis.selectAll("text.key")
            .data(data)
          .enter().append("text")
            .attr("class", "key")
            .attr("y", function (d, i) {
              return height + 42 + 30*(i%3);
            })
            .attr("x", function (d, i) {
              return 155 * Math.floor(i/3) + 15;
            })
            .attr("dx", x({x: .45}))
            .attr("dy", ".71em")
            .attr("text-anchor", "left")
            .text(function(d, i) {
              return d[0].name;
            });

        var keySwatches = vis.selectAll("rect.swatch")
            .data(data)
          .enter().append("rect")
            .attr("class", "swatch")
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d, i) {
              return color(i / (n - 1));
            })
            .attr("y", function (d, i) {
              return height + 36 + 30*(i%3);
            })
            .attr("x", function (d, i) {
              return 155 * Math.floor(i/3);
            });


        // Animate between grouped and stacked
        // ===================================

        function transitionGroup() {
          vis.selectAll("g.layer rect")
            .transition()
              .duration(500)
              .delay(function(d, i) { return (i % m) * 10; })
              .attr("x", function(d, i) { return x({x: .9 * ~~(i / m) / n}); })
              .attr("width", x({x: .9 / n}))
              .each("end", transitionEnd);

          function transitionEnd() {
            d3.select(this)
              .transition()
                .duration(500)
                .attr("y", function(d) { return height - y2(d); })
                .attr("height", y2);
          }
        }

        function transitionStack() {
          vis.selectAll("g.layer rect")
            .transition()
              .duration(500)
              .delay(function(d, i) { return (i % m) * 10; })
              .attr("y", y1)
              .attr("height", function(d) {
                return y0(d) - y1(d);
              })
              .each("end", transitionEnd);

          function transitionEnd() {
            d3.select(this)
              .transition()
                .duration(500)
                .attr("x", 0)
                .attr("width", x({x: .9}));
          }
        }

        // reset grouped state to false
        scope.grouped = false;

        // setup a watch on 'grouped' to switch between views
        scope.$watch('grouped', function (newVal, oldVal) {
          // ignore first call which happens before we even have data from the Github API
          if (newVal === oldVal) {
            return;
          }
          if (newVal) {
            transitionGroup();
          } else {
            transitionStack();
          }
        });
      });
    }
  }
});
