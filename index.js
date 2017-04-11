var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sayapp'
});

connection.connect();

var app = express();

app.get('/users', function(req, res) {
    var selectStatement = 'SELECT * FROM users';
    var options = [];
    connection.query(selectStatement, function(error, results, fields) {
        for (var i = 0; i < results.length; i++) {
            var optionString = '<option value=\"' + results[i].user_id + '\">' + results[i].name + '</option>';
            options.push(optionString);
        }
        res.send(options);
    })

})

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

app.post('/', function(req, res) {
    console.log("Got a POST request for the homepage");
    console.log(req.body);
    var voice = "\"" + req.body.voice.replace(/\W/g, "") + "\"";
    var text = "\"" + req.body.text.replace(/\W/g, "") + "\"";
    console.log(text);
    var selectStatement = 'SELECT * FROM users WHERE user_id=' + voice + ';';

    connection.query(selectStatement, function(error, results, fields) {
        var voiceName = results[0].name;
        var insertStatement = 'INSERT INTO messages (body, owner) VALUES (' + text + ',' + results[0].user_id + ')';

        connection.query(insertStatement, function(error, results, fields) {
            var cmd = 'say -v ' + voiceName + ' ' + text;

            exec(cmd, function(error, stdout, stderr) {
                // command output is in stdout
            });
            res.send('Hello POST');

            if (error) throw error;
            console.log('success');
        });
    });
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
