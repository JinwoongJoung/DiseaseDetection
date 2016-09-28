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

/*
// mysql query to select name from 'screenName' table
var query = connection.query('select name, tweetId from screenName', function(err,result){
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
    tweetIds[i] = id;
  }
  for (var x = 0, ln = nameList.length; x < ln; x++){
    setInterval(function(y){
      if (nameList[y] != "ptsd_artist"){
        getTimeline(nameList[y], tweetIds[y]);
      }
    },x * 1000 * 60 * 5, x);
  }
});
*/

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

getTimeline('RServiceDogCoach', 780924028273950720);

//Get User Timeline by the screen name
function getTimeline(name, maxId){
  T.get('statuses/user_timeline', {screen_name: name, max_id: maxId}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    //var firstTweetTime = new Date(Date.parse(obj2[0].created_at.replace(/( \+)/, ' UTC$1')));
    var currentTime = new Date();

    for (i = 0; i < obj2.length; i++) {
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
      var lastTweetTime = new Date(Date.parse(obj2[obj2.length - 1].created_at.replace(/( \+)/, ' UTC$1')));
      var lastTweetId = obj2[obj2.length - 1].id_str;
    }

    if ((currentTime - lastTweetTime) < (1000 * 60 * 60 * 24 * 90)){
      getTimeline(name, lastTweetId);
    }
  })
}
