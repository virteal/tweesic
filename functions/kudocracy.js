// kudocracy.js
//   Kudocracy compatibility layer.
//
// Feb 16 2021 by @jhr

/* ---------------------------------------------------------------------------
 *  Kudocracy compatibility layer.
 *  Somes files, imported from project Kudocracy, are kept compatible.
 *  This is done by faking the Kudocracy environment.
 */


const L8 = {};
const l8 = L8;

L8.trace = console.log.bind( console );

L8.assert = function( condition, ...args ){
  if( condition )return;
    KudoScope.trace.apply( KudoScope.trace, [ "Assert failure", ...args ] );
}

// l8.now provides a fast access to the time in millisec. That value is
// sample whenever the l8 scheduler wakes up. As a result, it can be
// useful to correlate sub events that pertain to the same event that
// woke up the scheduler.
l8.now = null

// l8.dateNow is the Date object sampled when l8.now was last sampled.
l8.dateNow = null

// Provide initial value for .now & .dateNow
l8.update_now = function(){
  return l8.now = (l8.dateNow = new Date()).getTime();
};

l8.update_now();


const Ephemeral = {};

Ephemeral.each = function( array, cb ){ return array.forEach( cb ) };

const Machine = {};

Ephemeral.Machine = Machine;
Machine.current = Machine;
Machine.main = Machine;

var TwitterKeys = require( "./twitter_keys" ).keys;

class Persona {

  constructor( label ){
    this.label = label;
    this.id = "#" + label;
    var keys = TwitterKeys; // file ./twitter_keys.js
    this.twitter_consumer_key        = keys.consumer_key;
    this.twitter_consumer_secret     = keys.consumer_secret;
    this.twitter_access_token_key    = keys.access_token_key;
    this.twitter_access_token_secret = keys.access_token_secret;
  }

  toString(){ return this.label; }
  is_domain(){ return true; }
  get_topic(){ return this; }
  get_data(){ return this; }

};


const Session = {};


exports.start = function( scope ){

  scope.l8     = L8;
  scope.trace  = L8.trace;
  scope.assert = L8.assert;
  scope.map = function(){ return new Map() };
  scope.set = function(){ return new Set() };

  scope.get_kudo_scope = function(){ return scope; };
  scope.Ephemeral = Ephemeral;
  scope.Topic     = Persona;
  scope.Persona   = Persona;
  scope.Session   = Session;

  // Create a test user
  var test_persona = new Persona( scope.domain )
  Persona.all = [ test_persona ];

  var ui1twit = require( "./ui1twit.js" );
  ui1twit.start( scope );
  
  // Start the favorite tweets monitoring
  // var twittrust = require( "./twittrust.js" );
  // twittrust.start( scope );
   
}
