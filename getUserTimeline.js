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
var query = connection.query('SELECT name, tweetId FROM screenName', function(err,result){
  if (err) {
    console.error(err);
    return;
  }
  // change the result into json format
  var obj = JSON.stringify(result);
  var obj2 = JSON.parse(obj);
  var nameList = new Array(100);
  var tweetIds = new Array(100);
  for (i = 0; i < 100; i++){
    var name = obj2[i].name;
    var id = obj2[i].tweetId;
    nameList[i] = name;
    tweetIds[i] = Number(id);
  }

  for (var x = 0, ln = nameList.length; x < ln; x++) {
    setTimeout(function(y) {
      getTimeline(nameList[y], tweetIds[y], 0);
    }, x * 1000 * 60, x); // recall the function every 1 min 
  }
});

/*
function getFirstTweetTime(name, maxId){
  T.get('statuses/user_timeline', {screen_name: name, max_id: maxId}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    var firstTweetTime = new Date(Date.parse(obj2[0].created_at.replace(/( \+)/, ' UTC$1')));
    console.log(firstTweetTime);
  })
}
getFirstTweetTime('twatterfull', 780864912386035712);
*/

//Get User Timeline by the screen name
function getTimeline(name, maxId, count){
  T.get('statuses/user_timeline', {screen_name: name, max_id: maxId, count: 200}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    //var firstTweetTime = new Date(Date.parse(obj2[0].created_at.replace(/( \+)/, ' UTC$1')));
    var currentTime = new Date();

    for (i = 0; i < obj2.length; i++) {
      count++;
      // store the results into timeLine table in mysql
      var parsedDate = new Date(Date.parse(obj2[i].created_at.replace(/( \+)/, ' UTC$1')));
      var timeLine = {
        screenName: name,
        tweetId: obj2[i].id_str,
        tweets: obj2[i].text,
        date: parsedDate
      };
      // insert query for mysql database
      var query = connection.query('insert into timeLine set ?', timeLine, function(err, result){
        if (err) {
          console.error(err);
          return;
        }
        console.error(result);
      });
      // get the last(not the lastest) tweet time and id
      var lastTweetTime = new Date(Date.parse(obj2[obj2.length - 1].created_at.replace(/( \+)/, ' UTC$1')));
      var lastTweetId = obj2[obj2.length - 1].id_str;
    }
    // calling the function again if the user's number of tweets is less than 1000 and time of the last tweet is in 60 days.
    if((currentTime - lastTweetTime) < (1000 * 60 * 60 * 24 * 60) && count <= 2000){
      getTimeline(name, lastTweetId, count);
    }
  })
}
