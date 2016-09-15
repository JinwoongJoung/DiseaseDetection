//Setting up Twitter API
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

//Search every 1 hour
setInterval(searchFor, 1000*60*60);

searchFor();

function searchFor() {
  T.get('search/tweets', { q: 'ptsd -rt', count: 10 }, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);

    for (i = 0; i < 9; i++) {
      console.log(obj2.statuses[i].id_str + ": " + obj2.statuses[i].text + " (" + obj2.statuses[i].created_at + ")");
    }
  })
}

/*
function getScreenName(ids) {
  T.get('statuses/lookup', { id: ids}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    var screenName = obj2[0].user.screen_name;
    console.log(screenName);
  })
}
*/


/*
T.get('statuses/user_timeline', { screen_name: 'Shinigamix07', count: 1 }, function(err, data, response) {
  console.log(data)
})
*/
