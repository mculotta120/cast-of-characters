var express = require('express');
var app = express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
var crud = require('./routes/crud');

// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/characterList';

//spin up server
app.listen(process.env.PORT || 8080, function(){ console.log("Running on local port 8080"); });

// app.set('port', (process.env.PORT || 8080));

//Allows a request.body to be posted
app.use(bodyParser.json());


// routes redirects
app.use('/', crud);

//find index.html in public/views and send it back
app.get('/*', function(req, res){
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '../public/', file));
});
