var YQL = require('yql');
var Firebase = require('firebase');

var FLICKR_API_KEY = 'eb45dbda9516ed5d46d7ba4d082626f0';

var _fb = new Firebase('https://teamwinit.firebaseio.com/');
var _fbRestaurants = _fb.child('restaurants');
var _fbWeather = _fb.child('weather');
var _fbFlickr = _fb.child('flickr');

var localQuery = 'SELECT * FROM local.search WHERE (query=@cuisine) AND (location=@location)';
//var localQuery='select * from local.search where query="sushi" and location="san francisco, ca"';
var weatherQuery = 'SELECT * FROM weather.forecast WHERE (location = @location)';
var flickrQuery = 'SELECT * FROM flickr.photos.interestingness(20) AND (api_key=@api_key)';

function getFlickrInterestingPhotos() {
    var yqlQuery = new YQL.exec(flickrQuery, function(response) {
//        console.log(response);
        //var results = response.query.results;
        //_fbFlickr.push(results);
    }, {
        'api_key' : FLICKR_API_KEY
    });
}

function getWeather(location) {
    var yqlQuery = new YQL.exec(weatherQuery, function(response) {
        var channel = response.query.results.channel;
        var location = channel.location;
        var condition = channel.item.condition;response.query.results.channel.item.condition;
        console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees and ' + condition.text);
    }, {
        'location': location
    });
}

function getRestaurants(cuisine, location) {
    var yqlQuery = new YQL.exec(localQuery, function(response) {
        var results = response.query.results.Result;
        for (var i=0; i < results.length; ++i) {
            var result = results[i];
            storeRestaurantResult(result);
        }
    }, {
       'cuisine': cuisine,
       'location': location
    });
}

function storeRestaurantResult(result) {
      _fbRestaurants.push(result);
}

getRestaurants('sushi', 'san francisco, ca');
getFlickrInterestingPhotos();

//process.exit(code=0);
