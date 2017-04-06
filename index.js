var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
	 console.log(req.body);
	 var voice="\""+req.body.voice.replace(/\W/g,"")+"\"";
	 var text="\""+req.body.text.replace(/\W/g,"")+"\"";
	 console.log(text);

	 var cmd = 'say -v '+voice+' '+text;

	 exec(cmd, function(error, stdout, stderr) {
  	// command output is in stdout
		});

   res.send('Hello POST');
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
