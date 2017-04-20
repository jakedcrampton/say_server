var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

var SQ = require('sequelize');

var sequelize = new SQ('sayapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var User = sequelize.define('users', {
    name: {
        type: SQ.STRING,
        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    uid: {
        type: SQ.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
    }
}, {
    timestamps: false
});

var app = express();

app.get('/users', function(req, res) {
    User.findAll().then(function(results) {
        res.send(results);
    })
})

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.post('/', function(req, res) {

    console.log("Got a POST request for the homepage");
    console.log(req.body);

    var voice = req.body.voice.replace(/\W/g, ""); //It wasnt recognizing the /" as not existing, so idk man. Probably because that's a string and not a SQ.INTEGER
    var text = "\"" + req.body.text.replace(/\W/g, "") + "\"";

    console.log(text);

    User.findAll({
        where: {
            uid: voice
        }
    }).then(function(results) {
        var voiceName = results[0].name;
        //var insertStatement = 'INSERT INTO messages (body, owner) VALUES (' + text + ',' + results[0].uid + ')';

        User.create({
            body: text,
            owner: results[0].uid
        }).then(function(results) {
            var cmd = 'say -v ' + voiceName + ' ' + text;

            exec(cmd, function(error, stdout, stderr) {
                // command output is in stdout
                res.send('Hello POST');
            });

            /*if (error) throw error;
            console.log('success');*/
        });
    });
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
