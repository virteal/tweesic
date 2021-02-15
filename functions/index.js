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
    response.json( { data: "HelloWorld() from Tweesic firebase nodejs side!" } );
  });
});

// Callable function
exports.hello = functions.https.onCall( ( data, context ) => {
  return { fragments: [
    { id: "hello", content: "hello() from Tweesic firebase nodejs side!" },
    { id: "fragments", content: "fragments ready!" }
  ] };
});
