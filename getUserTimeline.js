//Setting up Twitter API
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

// mysql query to select name from 'screenName' table
var query = connection.query('select name from screenName', function(err,result){
  if (err) {
    console.error(err);
    return;
  }
  // change the result into json format
  var obj = JSON.stringify(result);
  var obj2 = JSON.parse(obj);
  for (i = 0; i < 10; i++){
    var name = obj2[i].name.toString();
    getTimeline(name);
  }
});

// test run
//getTimeline('blasianFMA');

//Get User Timeline by the screen name
function getTimeline(name){
  T.get('statuses/user_timeline', { screen_name: name, count: 200}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);

    for (i = 0; i < 200; i++) {
      // store the results into timeLine table in mysql
      var timeLine = {
        screenName: name,
        tweetId: obj2[i].id_str,
        tweets: obj2[i].text,
        date: obj2[i].created_at
      };
      // insert query for mysql database
      var query = connection.query('insert into timeLine set ?', timeLine, function(err, result){
        if (err) {
          console.error(err);
          return;
        }
        console.error(result);
      });
    }
  })
}
