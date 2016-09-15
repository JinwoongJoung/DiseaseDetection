//Setting up Twitter API
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

//Search every 1 hour
setInterval(searchFor, 1000*60*60);

searchFor('ptsd -rt');

function searchFor(query) {
  T.get('search/tweets', { q: query, count: 100}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);

    for (i = 0; i < 99; i++) {
      console.log(obj2.statuses[i].id_str + ": " + obj2.statuses[i].text + " (" + obj2.statuses[i].created_at + ")");
    }
  })
}
