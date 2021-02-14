const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest( ( request, response )=>{
  cors( request, response, ()=>{
    functions.logger.info( "helloWorld() logs!", { structuredData: true } );
    response.json( { data: "HhlloWorld() from Tweesic firebase nodejs side!" } );
  });
});

// Callable function
exports.hello = functions.https.onCall( ( data, context ) => {
  functions.logger.info( "hello() logs!", { structuredData: true } );
  return "hello() from Tweesic firebase nodejs side!";
});
