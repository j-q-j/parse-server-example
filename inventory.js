var Parse = require('parse/node');

Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:1337/parse'

////////////// SODAS //////////////////////

//Creates the class of sodas
var SupernaturalSoda = Parse.Object.extend("supernaturalSoda");
// Creates the new soda
var supernaturalSoda = new SupernaturalSoda();

// Sets attributes of the new soda
supernaturalSoda.set("sodaName", "");
supernaturalSoda.set("sodaQuantity", "");

supernaturalSoda.save(null, {
	success: function(supernaturalSoda) {
	// Execute any logic that should take place after the object is saved.

	console.log('New soda created with objectId: ' + supernaturalSoda.id);
	},
  	error: function(supernaturalSoda, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    console.log('Failed to create new object, with error code: ' + error.message);
  }
});