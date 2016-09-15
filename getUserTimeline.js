//Setting up Twitter API
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

getTimeline('Sinstar33');
//Get User Timeline by the screen name
function getTimeline(name){
  T.get('statuses/user_timeline', { screen_name: name, count: 200, max_id: '776073507629310000' }, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    var maxId;

    for (i = 0; i < 199; i++) {
      console.log(obj2[i].id + ": " + obj2[i].text + " (" + obj2[i].created_at + ")");
    }
  })
}
