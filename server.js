
/**
 * module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , useragent = require('useragent');

useragent(true);

// robodeck app
var app = module.exports = express.createServer();

// Set the state of the slides to 0
var state = 0;

// Clients is a list of users who have connected
var clients = [];

// simple wrapper for sending a message
// to all the connected users and pruning out the
// disconnected ones.

function send(message) {
	
  console.log('SENDING');
  console.log(message);
  console.log(typeof message)

  // Iterate through all potential clients
  clients.forEach(function(client) {
	
	console.log(client.manager.open)
	
    // User is still connected, send message

	// This needs to change I dont believe its ever falling into false, but havent really tested yet
    if(client.manager.open) {
	  console.log(client.id + ' IS LISTENING');
      client.send(message);
    }
    // Prune out disconnected user
    else {
      delete client;
    }
  });
}

// app configs
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

// routes

// Deliver 
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

// Next will... move the slides forward!
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

// Prev will... move the slides backwards!
app.get('/prev', function(req, res) {
  
  console.log('PREVIOUS'); 
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
	  console.log('within PREV route /prev fallback to default');
	}
});

app.listen(process.env.PORT || 15184);

var sio = io.listen(app);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
// console.log(app)

// web sockets

sio.sockets.on('connection', function(client) {
  // For each connection made add the client to the array of clients.
  clients.push(client);

  // log each clients id
  clients.forEach(function(client) {
	console.log('CLIENT connected')
    console.log(client.id);
  });
  
});

// sio.sockets.on('connection', function (socket) {
//   // emit a message to client devices	
//   socket.emit('server', { server: 'data' });
// 
//   // listen for a message from mobile clients
//   socket.on('client-mobile', function (data) {
// 	console.log('CLIENT MOBILE event');    
// 	console.log(data);
// 	// pass date with callback function to desktop client
// 	socket.emit('changeDeck', { update: data });
//   });
// 
//   // listen for a message from desktop clients
//   socket.on('client-desktop', function (data) {
// 	console.log('CLIENT DESKTOP event');    
// 	console.log(data);
// 	socket.emit('changeDeck', { update: data });
// 	
//   });
//   // console.log('A socket connected!');
// });