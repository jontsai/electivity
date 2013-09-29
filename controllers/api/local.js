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

function getBlob() {
    return [{
    'id': "21373494",
    "name": "Sushi Bistro",
    "address": "455 Balboa St",
    "city": "San Francisco",
    "distance": "2.40",
    "categories": [
      "Sushi Restaurants",
      "Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm8.staticflickr.com/7392/9855694733_a551ca4572_b.jpg"
  },
  {
    "id": "21382989",
    "name": "Ebisu",
    "address": "1283 9th Ave",
    "city": "San Francisco",
    "distance": "2.72",
    "categories": [
      "Restaurants",
      "Sushi Restaurants",
      "Bars & Pubs",
      "Japanese Restaurants",
      "Family Style Restaurants"
    ],
    "image": "http://farm6.staticflickr.com/5466/9385602533_d0103caf4a_b.jpg"
  },
  {
    "id": "21361882",
    "name": "Blowfish Sushi to Die for - SF",
    "address": "2170 Bryant St",
    "city": "San Francisco",
    "distance": "1.32",
    "categories": [
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Chinese Restaurants",
      "Restaurants",
      "Seafood Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm8.staticflickr.com/7420/8964345784_2c7238dbc4_b.jpg"
  },
  {
    "id": "21362386",
    "name": "Godzila Sushi",
    "address": "1800 Divisadero St",
    "city": "San Francisco",
    "distance": "1.28",
    "categories": [
      "Restaurants",
      "Carry Out & Take Out",
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Chinese Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm8.staticflickr.com/7391/9581992874_168b1e37e6_b.jpg"
  },
  {
    "id": "21332685",
    "name": "Tokyo Go Go",
    "address": "3174 16th St",
    "city": "San Francisco",
    "distance": "0.87",
    "categories": [
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm4.staticflickr.com/3691/9581994394_6eb5826712_b.jpg"
  },
  {
    "id": "21374866",
    "name": "Marina Sushi Bar",
    "address": "2020 Lombard St",
    "city": "San Francisco",
    "distance": "1.81",
    "categories": [
      "Restaurants",
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Chinese Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm4.staticflickr.com/3820/9487982156_693c0c62b5_b.jpg"
  },
  {
    "id": "21384019",
    "name": "Goemon Japanese Restaurant",
    "address": "1524 Irving St",
    "city": "San Francisco",
    "distance": "3.12",
    "categories": [
      "Restaurants",
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Japanese Restaurants",
      "Family Style Restaurants"
    ],
    "image": "http://farm3.staticflickr.com/2815/9473790350_e67fbeec59_b.jpg"
  },
  {
    "id": "21385126",
    "name": "Yum Yum Fish",
    "address": "2181 Irving St",
    "city": "San Francisco",
    "distance": "3.50",
    "categories": [
      "Restaurants",
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Seafood Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm4.staticflickr.com/3682/9471014095_750e949e99_b.jpg"
  },
  {
    "id": "21329298",
    "name": "Akiko's Sushi Bar",
    "address": "542 Mason St",
    "city": "San Francisco",
    "distance": "0.95",
    "categories": [
      "Restaurants",
      "Southeast Asian Restaurants",
      "Sushi Restaurants",
      "Chinese Restaurants",
      "Japanese Restaurants"
    ],
    "image": "http://farm4.staticflickr.com/3819/9473794064_78b9d2f8f5_b.jpg"
  },
  {
    "id": "21378834",
    "name": "Minami Restaurant",
    "address": "1900 Clement St",
    "city": "San Francisco",
    "distance": "3.30",
    "categories": [
      "Restaurants",
      "Sushi Restaurants",
      "Japanese Restaurants",
      "Family Style Restaurants"
    ],
    "image": "http://farm8.staticflickr.com/7316/8996044937_4e8823e301_b.jpg"
  }
];
};

exports.collection = function(request, response) {
    if (request.params.query === 'Sushi' &&  request.params.location === 'San Francisco') {
        response.send(getBlob());
    }
  
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
