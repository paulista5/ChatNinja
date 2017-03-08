var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var controller = require('./controller/maincontroller.js');

app.set('view engine', 'ejs');
app.use(express.static('public'));


controller(app);

server.listen(process.env.PORT||3000);
