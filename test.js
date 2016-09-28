/*
var list = [1,2,3,4];

for (var x = 0, ln = list.length; x < ln; x++) {
  setTimeout(function(y) {
    console.log(list[y]);
  }, x * 2000, x); // we're passing x
}
*/

/*
var currentDate = new Date().toJSON().slice(0,10);
console.log(utc);
*/

/*
var currentTime = new Date();
console.log(currentTime);
*/

var isoDate = new Date().toISOString();
console.log(isoDate);
