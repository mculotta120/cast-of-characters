var express = require('express');
var app = express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );

var pg=require('pg');
// postgres must be running and you must have this db name correct
var connectionString = 'postgres://localhost:5432/characterList';

//Allows a request.body to be posted
app.use(bodyParser.json());

// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

app.post('/deleteChar', urlencodedParser, function(req, res) { // sends data to characters database
    var charId = req.body.id;
    console.log("deleting character, ", charId);
    pg.connect( connectionString, function( err, client, done){
      console.log("req.body.id  ", req.body.id);

    client.query("DELETE FROM character WHERE id = ($1)", [req.body.id]);
    done();
  }); // end pg.connect
  res.send("res success");
  });

  app.post('/edit', urlencodedParser, function(req, res) { // sends data to characters database
      var id = req.body.id;
      var newName = req.body.newName;
      var newSketch = req.body.newSketch;
      var newAffiliations = req.body.newAffiliations;
      var newIssues = req.body.newIssues;
      var newBio = req.body.newBio;

      console.log("updating Character, ", id);
      pg.connect( connectionString, function( err, client, done){
        console.log("req.body.id  ", req.body.id);
        client.query("UPDATE character SET name = ($1), sketch = ($2), affiliations = ($3), issues = ($4), bio = ($5) WHERE id = ($6)", [newName, newSketch, newAffiliations, newIssues, newBio, id]);
    done();
    }); // end pg.connect
    res.send("res success");
    });


app.post('/sendToDb', urlencodedParser, function(req, res) { // sends data to characters database
    console.log("in app.post");

    var charName = req.body.name;
    var charSketch = req.body.sketch;
    var charAffiliations = req.body.affiliations;
    var charIssues = req.body.issues;
    var charBio = req.body.bio;

          pg.connect( connectionString, function( err, client, done ){
            if (err) {     // check for errors
            console.log(err);
          } else {
            client.query( 'INSERT INTO character ( name, sketch, affiliations, issues, bio) VALUES ($1, $2, $3, $4, $5)', [ charName, charSketch, charAffiliations, charIssues, charBio ]);
          console.log("this is entering the database",   charName, charSketch, charAffiliations, charIssues, charBio);
          done();
        } //end else
      }); //end pg.connect
      }); // end POST


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
