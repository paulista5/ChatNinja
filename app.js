var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var controller = require('./controller/maincontroller.js');
var chatController = require('./controller/chatcontroller.js');
app.set('view engine', 'ejs');
app.use(express.static('public'));


controller(app);
chatController(io);
server.listen(process.env.PORT||3000);
