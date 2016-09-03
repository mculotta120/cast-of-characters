var express = require('express');
var app = express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/characterList';
// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

app.post('/sendToDb', urlencodedParser, function(req, res) { // sends data to characters database
    console.log("in app.post");
    characterToInput = { name: req.body.name,
                        sketch: req.body.sketch,
                        affiliations: req.body.affiliations,
                        issues: req.body.issues,
                        bio: req.body.bio };

    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else {
        var character = client.query("INSERT INTO character ( name, sketch, affiliations, issues, bio) VALUES($1, $2, $3, $4, $5)", [ req.body.name, req.body.sketch, req.body.affiliations, req.body.issues, req.body.bio ]);  // send data to database
        character.on('row', function(row) {  // pushing to array
          results.push(row);
        });  // end query push
        character.on('end', function() {  // sending to scripts
          console.log("character info to input from app.post in app");
          console.log( characterToInput );
          console.log(results, "results");
          return res.json(results);
        }); // end products.on function
      done(); // signals done
    } // end else
  }); // end pg connect function
}); // end app.post /sendToDb function

app.get( '/getChars', function( req, res ){
  var results = [];
    pg.connect( connectionString, function( err, client, done ) {
        var query = client.query('SELECT * FROM character ORDER BY name DESC;');
        query.on( 'row', function( row ) {
            results.push( row );
        }); // end row
        // close connection
        query.on('end', function() {
            done();
            return res.json( results );
        }); // end onEnd
        if(err) {
            console.log(err);
        } // end error
      });
}); // end base url


//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});
