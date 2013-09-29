var YQL = require('yql');
var Firebase = require('firebase');
var when = require('when');

var FLICKR_API_KEY = 'eb45dbda9516ed5d46d7ba4d082626f0';

var _fb = new Firebase('https://teamwinit.firebaseio.com/');
var _fbRestaurants = _fb.child('restaurants');
var _fbWeather = _fb.child('weather');
var _fbFlickr = _fb.child('flickr');

var localQuery = 'SELECT * FROM local.search(0,@limit) WHERE (query=@query) AND (location=@location)';
var weatherQuery = 'SELECT * FROM weather.forecast(0,@limit) WHERE (location = @location)';
var flickrQuery = 'SELECT * FROM flickr.photos.search(0,@limit) WHERE has_geo=@has_geo AND text=@text and api_key=@api_key and sort=@sort';

function getFlickrInterestingPhotos(query, location, limit) {
    var defer = when.defer();
    var yqlQuery = new YQL.exec(flickrQuery, function(response) {
        var results = response.query.results;
        defer.resolve(results);
    }, {
        'limit' : limit,
        'has_geo': true,
        'text' : query + ' ' + location,
        'api_key': FLICKR_API_KEY,
        'sort': 'interestingness.desc'
    });

    return defer.promise;
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

function getLocalSearchResults(query, location, limit) {
    console.log(query);
    console.log(location);
    var defer = when.defer();
    
    var yqlQuery = new YQL.exec(localQuery, function(response) {
        var results = response.query.results.Result,
        formatted = [];
        results.forEach(function(result) {
            var item = {id: result.id, name: result.Title, address: result.Address, city: result.City, distance: result.Distance, categories: []};
            result.Categories.Category.forEach(function(category) {
                item.categories.push(category.content);
            });
            formatted.push(item);
        });
        defer.resolve(formatted);
    }, {
        'limit': limit,
        'query': query,
        'location': location
    });
    return defer.promise;
}
exports.getLocalSearchResults = getLocalSearchResults;

exports.collection = function(request, response) {
    var deferreds = [];
    deferreds.push(getLocalSearchResults(request.params.query, request.params.location, request.params.limit));
    deferreds.push(getFlickrInterestingPhotos(request.params.query, request.params.location, request.params.limit))
    
    when.all(deferreds).then(
        function(results) {
            var output = results[0], i = 0;
            results[1].photo.forEach(function(image) {
                if(typeof image.farm !== undefined 
                    && typeof image.server !== undefined 
                    && typeof image.id !== undefined 
                    && typeof image.secret !== undefined) 
                {
                    console.log(image);
                    output[i++].image = 'http://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '_b.jpg';
                }
            });
            response.json(output);
        }
    );
}

function storeRestaurantResult(result) {
    _fbRestaurants.push(result);
}

function handleLocalSearchSuccess(results) {
    console.log(results);
}

function handleLocalSearchFailure() {
    // do nothing
}
