
/**
 * module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , useragent = require('useragent')
  , gm = require('googlemaps')
  , yqlgeo = require('./node_modules/yqlgeo');

// Uncomment to update useragent lookup table
//useragent(true);

// console.log(io)
// console.log(express);
// console.log(yqlgeo);
// console.log(useragent);
// console.log(gm);

///////////////////////////////////////////////////////////////////// ROBODECK APP
var app = module.exports = express.createServer();

// console.log(app);

// Set the state of the slides to 0
var state = 0;

// Clients is a list of users who have connected
var clients = [];

///////////////////////////////////////////////////////////////////// SEND() UTILITY
// simple wrapper for sending a message
// to all the connected users and pruning out the
// disconnected ones.

function send(message) {
	
  // console.log('SENDING');
  // console.log(message);
  // console.log(typeof message)
  // Iterate through all potential clients
  clients.forEach(function(client) {
	
	// console.log(client)
	// console.log(client.manager.open)
    // User is still connected, send message
	// This needs to change I dont believe its ever falling into false, 
	// but havent really tested yet - TESTED, not working - API changed
    if(client.manager.open) {
	  //console.log(client.id + ' IS LISTENING');
      client.send(message);
    }
    // Prune out disconnected user
    else {
	  console.log('DELETING CLIENT WITH ID: ' + client.id );
      delete client;
    }
  });
}

///////////////////////////////////////////////////////////////////// APP CONFIGS
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

///////////////////////////////////////////////////////////////////// INITIAL LOAD - DEVICE DETECT --> SERVE MARKUP, STATIC ASSETS
///////////////////////////////////////////////////////////////////// ROUTES

app.get('/', function(req, res) {
	
	var ua = useragent.is(req.headers['user-agent'])
	switch(true)
	{
	case ua.chrome:
	  console.log('within ROOT route / detected as chrome desktop');
	  routes.desktop(req, res);
	  break;
	case ua.mobile_safari:
	  console.log('within ROOT route / detected as mobile_safari');
	  routes.iphone(req, res);
	  break;
	default:
	  console.log('within ROOT route / fallback to default');
	  routes.desktop(req, res);
	}
});

///////////////////////////////////////////////////////////////////// ACCEPT XHR CALLS FROM REMOTE MOBILE APP 
///////////////////////////////////////////////////////////////////// ROUTES - Next()
app.get('/next', function(req, res) {
	
  console.log('NEXT');	
  state++;
  console.log(state);

	var ua = useragent.is(req.headers['user-agent'])
	switch(true)
	{
	case ua.chrome:
	  // shouldnt fall in here. Unless desktop hits /next - but it shouldnt
	  console.log('within NEXT route /next detected as chrome desktop');
	  break;
	case ua.mobile_safari:
	  console.log('within NEXT route /next detected as mobile_safari');	
	
	  // catch xhr via iphone or ipad and send state
	  send(JSON.stringify({ "state": state }));
	  break;
	default:
	  console.log('within NEXT route /next fallback to default');
	}
});

///////////////////////////////////////////////////////////////////// ROUTES - Back()
app.get('/back', function(req, res) {
  
  console.log('BACK'); 
  state--;
  console.log(state);

	var ua = useragent.is(req.headers['user-agent'])
	switch(true)
	{
	case ua.chrome:
	  // shouldnt fall in here. Unless desktop hits /prev - but it shouldnt
	  console.log('within PREV route /prev detected as chrome desktop');
	  break;
	case ua.mobile_safari:
	  console.log('within PREV route /prev detected as mobile_safari');	
	
	  // catch xhr via iphone or ipad and send state
	  send(JSON.stringify({ "state": state }));
	  break;
	default:
	  console.log('within BACK route /back fallback to default');
	}
});

///////////////////////////////////////////////////////////////////// ROUTES - Other()
app.get('/other', function(req, res) {
  
  console.log('OTHER'); 
  console.log(state);

	var ua = useragent.is(req.headers['user-agent'])
	switch(true)
	{
	case ua.chrome:
	  // shouldnt fall in here. Unless desktop hits /other - but it shouldnt
	  console.log('within OTHER route /other detected as chrome desktop');
	  break;
	case ua.mobile_safari:
	  console.log('within OTHER route /other detected as mobile_safari');	
	
	  // catch xhr via iphone or ipad and send state
	  send(JSON.stringify({ "fn": function(){console.log('other callback fn')} }));
	  break;
	default:
	  console.log('within OTHER route /other fallback to default');
	}
});

app.listen(process.env.PORT || 1511);

///////////////////////////////////////////////////////////////////// SOCKET.IO SERVER
// io.set('log level', 1);
// io.set('heartbeats', false);
// var sio = io.listen(app, [{"heartbeats": false}]);
// var sio = io.listen(app, {"heartbeats": true, "heartbeat timeout": 30, "heartbeat interval": 30});
// var sio = io.listen(app, {"heartbeats": false, "heartbeat timeout": 2, "heartbeat interval": 2});
// var sio = io.listen(app, {"heartbeat timeout": 2, "heartbeat interval": 2});
// var sio = io.listen(app, {"heartbeats": false});

var sio = io.listen(app);
// console.log(sio.settings);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


///////////////////////////////////////////////////////////////////// SOCKET.IO WEB SOCKETS
sio.sockets.on('connection', function(client) {
  // For each connection made add the client to the array of clients.
  console.log('server connection EVENT FIRED');
  clients.push(client);
  console.log(clients.length);

  send(JSON.stringify({ "clients": clients.length }));

  // log each clients id
  clients.forEach(function(client) {
	console.log('CLIENT connected')
    console.log(client.id);
  });

  client.on('disconnect', function () {
    console.log('disconnect EVENT FIRED');
	// console.log(clients.length)
	var index = clients.indexOf(client.id);
	console.log(index)
	clients.splice(index, 1);
	console.log(clients.length)
  });

  client.on('geo', function(data) {
	console.log('geo MESSAGE received');
	console.log(data);
	var loc = data.lat + "," + data.long
	console.log(loc)
	gm.reverseGeocode(loc, function(err, data){
	  // console.log(JSON.stringify(data));
	  // console.log(data.results[0].address_components[2].long_name);
	  // console.log(data.results[0].address_components[4].long_name);
	  var city = data.results[0].address_components[2].long_name;	
	  var state = data.results[0].address_components[4].long_name;
	
	  var loc = city + ", " + state; 
	
	  send(JSON.stringify({ "loc": loc }));
	

	});
  });
  
});