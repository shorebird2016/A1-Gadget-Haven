var express = require('express');
var path = require("path");
var app = express();

app.set('port', (process.env.PORT || 3000));

//--don't touch those 2 lines under heroku, must use this pattern to work
app.use(express.static(__dirname + '/client'));//MUST use this to serve from client folder NOT ./client TODO.....????
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './client/index.html'));//use absolute path to serve home page
});

// app.get('/dance', function (req, res) {
//     dance.retrieveDances(req, res);
// });


//--do this last
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


