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

// mysql query to select tweetId from 'tweets' table
var query = connection.query('select tweetId from tweets', function(err,result){
  if (err) {
    console.error(err);
    return;
  }
  // change the result into json format
  var obj = JSON.stringify(result);
  var obj2 = JSON.parse(obj);
  // store the results in string array and make it one comma-separated string
  var arr = new Array(100);
  for (i = 0; i < 100; i++){
    var tweetId = obj2[i].tweetId;
    arr[i] = tweetId;
    var tweetIds = arr.toString();
  }
  getScreenName(tweetIds);
});

// Twitter API function to get the screen name by tweet id
function getScreenName(ids) {
  T.get('statuses/lookup', { id: ids}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj);
    for (i = 0; i < 100; i++){
      // store the results into screenName table in mysql
      var screenName = {
        tweetId: obj2[i].id_str,
        name: obj2[i].user.screen_name
      };
      // insert query for mysql database
      var query = connection.query('insert into screenName set ?', screenName, function(err, result){
        if (err) {
          console.error(err);
          return;
        }
        console.error(result);
      });
    }
  })
}
