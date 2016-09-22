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
//Search every 1 hour
setInterval(searchFor, 1000*60*60);
*/

searchFor('ptsd -rt');

function searchFor(keyword) {
  // Twitter API method
  T.get('search/tweets', { q: keyword, count: 100, lang: 'en'}, function(err, data, response) {
    var obj = JSON.stringify(data);
    var obj2 = JSON.parse(obj); //change the format of the result into JSON

    for (i = 0; i < 100; i++) {
      // store the result in mysql columns in the table
      var tweets = {
        tweetId: obj2.statuses[i].id_str,
        tweet: obj2.statuses[i].text
      };
      // insert query for mysql
      var query = connection.query('insert into tweets set ?', tweets, function(err, result){
        if (err) {
          console.error(err);
          return;
        }
        console.error(result);
      });
    }

  })
}
