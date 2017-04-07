var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var controller = require('./controller/maincontroller.js');
var chatController = require('./controller/chatcontroller.js');
require('./controller/passport.js')(passport);


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({secret: 'chatninjaencoded',
        resave:true,
      saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

controller(app, passport);
chatController(io);
server.listen(process.env.PORT||3000);
