var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

/*
T.get('search/tweets', { q: 'ptsd until:2016-09-09', count: 100 }, function(err, data, response) {
  console.log(data)
})
*/

T.get('statuses/user_timeline', { screen_name: 'Shinigamix07', count: 1 }, function(err, data, response) {
  console.log(data)
})
