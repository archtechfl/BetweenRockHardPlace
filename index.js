//Set up server with express package

var express = require("express");
var app = express();
var port = 3700;

var io = require('socket.io').listen(app.listen(port));

//Sockets.io settings, handles communication between front end and back end

io.sockets.on('connection', function (socket) {
    //socket.emit('message', { message: 'welcome to the chat' });
    
    var address = socket.handshake.address;
    console.log("New connection from " + address.address + " : " + address.port);
    
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

//Prepare front end template file

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
 
app.use(express.static(__dirname + '/public')); 

console.log("Listening on port " + port);
