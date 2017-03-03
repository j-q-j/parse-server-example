var Parse = require('parse/node');

Parse.initialize("Sup3rS0da");
Parse.serverURL = 'http://supernatural-sodas-parse.herokuapp.com/parse';
Parse.masterKey = 'frfnieurnfddc4rf34fe';
Parse.databaseUri = 'mongodb://heroku_wlwgjx3v:p1kehucb5fepar9dd1var490lu@ds113650.mlab.com:13650/heroku_wlwgjx3v';

////////////// SODAS //////////////////////

//Creates the class of sodas

var SupernaturalSoda = Parse.Object.extend("SupernaturalSoda");
// Creates the new soda

function SodaFactory(attributes) {
	var supernaturalSoda = new SupernaturalSoda();
	for (attribute in attributes) {
		supernaturalSoda.set(attribute, attributes[attribute]);
	}
		// Sets attributes of the new soda
	supernaturalSoda.save(null, {
		success: function(supernaturalSoda) {
		// Execute any logic that should take place after the object is saved.
			console.log(supernaturalSoda);
		},
  		error: function(supernaturalSoda, error) {
   		 // Execute any logic that should take place if the save fails.
    	// error is a Parse.Error with an error code and message.
    		console.log('Failed to create new object, with error code: ' + error.message);
    	}
    });		
}

var newFlavour = {
	sodaName: "Chocolate",
	sodaQuantity: 174
}

var newSoda = SodaFactory(newFlavour);


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

// //////////// GET IT BACK //////////
// var SupernaturalSoda = Parse.Object.extend("SupernaturalSoda");
// var query = new Parse.Query(SupernaturalSoda);
// query.get("3zfG4OOtMG", {
// 	success: function(supernaturalSoda) {
// 		// The object was retrieved successfully
// 		console.log(supernaturalSoda.get("sodaQuantity"))
// 	},
// 	error: function(object, error) {
// 		// The object was not retrieved succesffully
// 		console.log("Error: " + error.code + " " + error.message);
// 	}
// });