// index.js
//   That's the entry point on the server side

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

const Tweesic = {};

Tweesic.domain = "suvranu";

Tweesic.get_config = function(){ return Tweesic; }

Tweesic.ui1twit = function(){
  console.log( "Tweesic started on domain " + Tweesic.domain );
}

require( "./kudocracy.js" ).start( Tweesic );

