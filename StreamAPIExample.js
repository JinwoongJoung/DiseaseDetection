console.log('The twitter bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('statuses/filter', {track: 'ptsd I,ptsd we,ptsd me,ptsd us,ptsd my,ptsd mine,ptsd our,ptsd ours', language: 'en'});

// Anytime someone follows me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
  var tweetId = eventMsg.id_str;
  var createdAt = eventMsg.created_at;
  var text = eventMsg.text;
  var user = eventMsg.user.screen_name;

  var result = tweetId + " " + user + ": " + text + "(" + createdAt + ")"
  console.log(result);
}
