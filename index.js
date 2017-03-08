// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var jquery = require("jquery");
var Pusher = require('pusher');

var databaseUri = process.env.DATABASE_URI || 'mongodb://heroku_rtzfhkmq:go3abk4dfibc9gniqndvoclhdd@ds133328.mlab.com:33328/heroku_rtzfhkmq';

var api = new ParseServer({
  databaseUri: process.env.MONGODB_URI || 'mongodb://heroku_rtzfhkmq:go3abk4dfibc9gniqndvoclhdd@ds133328.mlab.com:33328/heroku_rtzfhkmq',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'Sup3rS0da',
  masterKey: process.env.MASTER_KEY || 'frfnieurnfddc4rf34fe', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://supernatural-sodas-parse.herokuapp.com/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var pusher = new Pusher({
  appId: '310535',
  key: '1e3d02f7d556d73e3888',
  secret: '4afe659880e146c9ff2a',
  encrypted: true
});

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/site.html'));
});

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

// Creat class Supernatural Sodas
var SupernaturalSodas = Parse.Object.extend("SupernaturalSodas"); 


// Process equest to create a new supernaturalSoda
app.post('/save', function(req, res) {
  // create new instance of Class
  var supernaturalSoda = new SupernaturalSodas();
  // write attributes to instance of class
  for (object in req.body) {
    supernaturalSoda.set(object, req.body[object]);
  }
  // save class instance
  supernaturalSoda.save(null, {
    success: function(supernaturalSoda) {
        // Execute any logic that should take place after the object is saved
        
        res.sendStatus(200);
        pusher.trigger('sodas', 'test_event', jsonArray);
    },
    error: function(supernaturalSoda, error) {
       // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.log('Failed to create new object, with error code: ' + error.message);
    }
  });
});


// Get a list of names and quantities of all the SupernaturalSodas
app.get('/inventory', function(req, res) {
  // creates new search
  var query = new Parse.Query(SupernaturalSodas);
  // limits the results by the criteria
  // query.greaterThan("sodaQuantity", 0);
  query.find({
    success: function(feeds) {
      var jsonArray = [];
      // console.log("Successfully retrieved " + results.length + " Sodas");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < feeds.length; i++) {
           jsonArray.push(feeds[i].toJSON());
           console.log(jsonArray);
      } 
      // res.sendStatus(200);
      res.json(jsonArray);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
});



// Get a list of names and quantities of all the SupernaturalSodas
// app.get('/inventory', function(req, res) {
//   // creates new search
//   var query = new Parse.Query(SupernaturalSodas);
//   // limits the results by the criteria
//   // query.greaterThan("sodaQuantity", 0);
//   query.find({
//     success: function(supernaturalsodas) {
//       supernaturalsodas = supernaturalsodas.map(function(supernaturalsoda) {
//         return supernaturalsoda.toJSON();
//       }),

//       console.log('supernaturalsodas post .toJSON()', supernaturalsodas);

//       // Return the JSON to frontend:
//       response.success(supernaturalsodas);
//     },
//     error: function(error) {
//       alert("Error: " + error.code + " " + error.message);
//     }
//   });
// });






