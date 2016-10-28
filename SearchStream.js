console.log('The twitter bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// setting up mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'DiseaseDetection',
  port: '8889'
});

connection.connect();

// Setting up a public stream
var stream = T.stream('statuses/filter', {track: 'ptsd I,ptsd we,ptsd me,ptsd us,ptsd my,ptsd mine,ptsd our,ptsd ours', language: 'en', delimited: 140, filter_level: 'low'});

// Anytime someone tweets about ptsd
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
  var parsedDate = new Date(Date.parse(eventMsg.created_at.replace(/( \+)/, ' UTC$1')));

  var TweetStream = {
    tweetId: eventMsg.id_str,
    user: eventMsg.user.screen_name,
    text: eventMsg.text,
    date: parsedDate
  };
  if (!eventMsg.text.includes("RT")){
    // insert query for mysql database
    var query = connection.query('insert into TweetStream set ?', TweetStream, function(err, result){
      if (err) {
        console.error(err);
        return;
      }
      console.error(result);
    });
  }
}
