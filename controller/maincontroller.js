var bodyParser = require('body-parser');
var urlEncoderParser = bodyParser.urlencoded({extended:false});
var path = require('path');
var databaseConnection = require(path.join(__dirname,'..','database/databaseConnectionHelper.js'));
var insertGroup = require(path.join(__dirname,'..','/database/insertGroup.js'));
var getGroups = require(path.join(__dirname,'..','/database/getGroups.js'));
var getUsers = require(path.join(__dirname,'..','/database/getUsersInGroup.js'))
var sse = require('./sse');
var deleteGroup = require(path.join(__dirname,'..','/database/deleteGroup.js'))
var data;
var count = 0;

module.exports = function(app, passport){
  app.use(sse);
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.get('/', function(req, res){
    res.render('main.ejs');
  });

  app.post('/', urlEncoderParser, function(req, res){
    var data = req.body;
    var group = {};
    group['groupName'] = data.groupName;
    group['discussionTopic'] = data.discussionTopic;
    group['numberOfUsers'] = 0;
    insertGroup(group, function(result){
      console.log(result);
    });
    //res.render('chatroom')
  });
  app.get('/stream', function(req, res){
    getGroups(function(data){
        count = data.length;
        res.sseSetup();
        res.sseSend(data);
    });
  });
  app.get('/ch/:id', function(req, res){
    var id = req.params.id;
    getUsers(id, function(docs){
      //console.log(docs);
      res.render('chatroom', {_id: id, userlist: docs});
    })
  });

  // admin panel

  app.get('/admin_login', function(req, res){
    console.log('login called');
    var message={}
    res.render('adminlogin.ejs', {message});
  });
  app.post('/admin_login', passport.authenticate('local-login',{
    successRedirect: '/adminpanel',
    failureRedirect: '/admin_login',
    failureFlash: true
  }));
  app.get('/adminpanel', isLoggedIn, function(req, res){
      getGroups(function(groups){
        console.log(groups);
        res.render('adminpanel.ejs', {'data': groups});
    });

  });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/admin_login');
  });
  app.delete('/adminpanel/:id', function(req, res){
    var id = req.params.id;
    console.log('delete');
    deleteGroup(id, function(status){
      console.log(status);
    })
  });
};
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/admin_login');
}
