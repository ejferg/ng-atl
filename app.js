
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , wrtc = require('webrtc.io');

var app = express();
var server = http.createServer(app);
wrtc = wrtc.listen(server);


/* -------------- <configurations> -------------- */

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/* -------------- </configurations> -------------- */

/* -------------- server setup -------------- */

server.listen(app.get('port'));


/* -------------- <webrtc.io> -------------- */

wrtc.rtc.on('connect', function(rtc) { 
    console.log('user connected');
});

wrtc.rtc.on('send answer', function(rtc) { 
	console.log('answer sent');
});

wrtc.rtc.on('disconnect', function(rtc) { 
	console.log('user disconnected');
});

/* -------------- </webrtc.io> -------------- */


/* -------------- <routes> -------------- */

app.get('/', function(req, res){
    
    res.render('index');
});
