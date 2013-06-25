
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

var app = express();
var server = http.createServer(app);

io = io.listen(server, { log: false });

/* -------------- <configurations> -------------- */

app.set('port', process.env.PORT || 3000);
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

/* -------------- for presence detection! -------------- */

var channels = {};

/* -------------- <socket.io> -------------- */

io.sockets.on('connection', function (socket) {
    console.log('connected');
    
    var initiatorChannel = '';
    
    if (!io.connected)
        io.connected = true;

    socket.on('new-channel', function (data) {
    
        console.log('io:: new-channel ::');
        
        channels[data.channel] = data.channel;
        onNewNamespace(data.channel, data.sender);
    });

    socket.on('presence', function (channel) {
        
        console.log('io:: presence ::');
        
        var isChannelPresent = !!channels[channel];
        socket.emit('presence', isChannelPresent);
        
        if (!isChannelPresent)
            initiatorChannel = channel;
    });

    socket.on('disconnect', function (channel) {
        
        if (initiatorChannel)
            channels[initiatorChannel] = null;
    });
});

var onNewNamespace = function(channel, sender) {
    
    io.of('/' + channel).on('connection', function (socket) {
        
        if (io.isConnected) {
            io.isConnected = false;
            socket.emit('connect', true);
        }

        socket.on('message', function (data) {
            if (data.sender == sender)
                socket.broadcast.emit('message', data.data);
        });
    });
}

/* -------------- </socket.io> -------------- */


/* -------------- <routes> -------------- */

app.get('/', function(req, res){
    
    res.render('index');
});
