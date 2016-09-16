//Setting up Twitter API
var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

getScreenName('776560493343322112');

function getScreenName(ids) {
  T.get('statuses/lookup', { id: ids}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    var screenName = obj2[0].user.screen_name;
    console.log(screenName);
  })
}
