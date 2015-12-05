var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var spark = require('spark');
console.log("logging into spark");
spark.login({accessToken: '2ace4a59de56bfae59bd9ce30ee14d5ed8c2a206'}).then(
	function(token){
		console.log('login happy: ', token);
		setInterval(
			function() {
				console.log("updating..");
				spark.publishEvent("weather_update", "4").then(
					function(data) {
						if (data.ok) { 
							console.log("successful") 
						} else {
							console.log("not successful");
						}
					},
					function(err) {
						console.log("Failed to publish event: " + err)
					}
				);
			}, 
			10 * 1000
		);
	},
	function(err) {
		console.log('login sad: ', err);
	}
);
