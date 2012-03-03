
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , useragent = require('useragent');

useragent(true);


var app = module.exports = express.createServer();

// Configuration

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

// Routes
app.get('/', function(req, res) {
	var ua = useragent.is(req.headers['user-agent'])
  	console.log(ua);
	console.log(typeof ua);
	console.log('ua chrome: ' + ua.chrome)

	switch(true)
	{
	case ua.chrome:
	  console.log('detected as chrome desktop');
	  routes.desktop(req, res);
	  break;
	case ua.mobile_safari:
	  console.log('detected as mobile_safari');	
	  routes.iphone(req, res);
	  break;
	default:
	  console.log('fallback to default');
	  routes.desktop(req, res);
	}
	
	// if (ua.chrome) {
	// 	console.log('detected as chrome desktop');
	// 	routes.desktop(req, res);
	// }
	// else if(ua.mobile_safari){
	// 	console.log('detected as mobile_safari');	
	// 	routes.iphone(req, res);
	// }
	// else {
	// 	console.log('fallback to default');
	// 	routes.desktop(req, res);
	// }
});

app.listen(process.env.PORT || 3000);
var sio = io.listen(app);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
console.log(app)
// var ua = useragent.is(req.headers['user-agent'])
// console.log(ua);

sio.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  console.log('A socket connected!');
});