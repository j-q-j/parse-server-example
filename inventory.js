var Parse = require('parse/node');

Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:1337/parse'
Parse.masterKey = 'frfnieurnfddc4rf34fe'

////////////// SODAS //////////////////////

//Creates the class of sodas
// var SupernaturalSoda = Parse.Object.extend("SupernaturalSoda");
// // Creates the new soda
// var supernaturalSoda = new SupernaturalSoda();

// Sets attributes of the new soda
// supernaturalSoda.set("sodaName", "Grapefruit");
// supernaturalSoda.set("sodaQuantity", 3);

// supernaturalSoda.save(null, {
// 	success: function(supernaturalSoda) {
// 	// Execute any logic that should take place after the object is saved.
// 	console.log(supernaturalSoda);
// 	},
//   	error: function(supernaturalSoda, error) {
//     // Execute any logic that should take place if the save fails.
//     // error is a Parse.Error with an error code and message.
//     console.log('Failed to create new object, with error code: ' + error.message);
//   }
// });


var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    console.log(gameScore);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    console.log('Failed to create new object, with error code: ' + error.message);
  }
});

console.log(gameScore);

//////////// GET IT BACK //////////
// var SupernaturalSoda = Parse.Object.extend("SupernaturalSoda");
// var query = new Parse.Query(SupernaturalSoda);
// query.equalTo("objectId", "rwoIWWtG4B");
// query.find({
// 	success: function(results) {
// 		console.log("There are only " + supernaturalSoda.sodaQuantity + " left!" );
// 	},
// 	error: function(error) {
// 		console.log("Error: " + error.code + " " + error.message);
// 	}
// });