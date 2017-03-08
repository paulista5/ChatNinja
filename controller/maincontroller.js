var bodyParser = require('body-parser');
var urlEncoderParser = bodyParser.urlencoded({extended:false});
var path = require('path');
var databaseConnection = require(path.join(__dirname,'..','database/databaseConnectionHelper.js'));
var insertGroup = require(path.join(__dirname,'..','/database/insertInDataBase'));
var getGroups = require(path.join(__dirname,'..','/database/getGroups'));
var sse = require('./sse');
var data;
var count = 0;

databaseConnection();

module.exports = function(app){
  app.use(sse);
  app.get('/', function(req, res){
    res.render('main.ejs');
  });

  app.post('/', urlEncoderParser, function(req, res){
    insertGroup(req.body);

    //res.render('chatroom')
  });

  app.get('/stream', function(req, res){
    data = getGroups();
    //console.log(data);
    if(typeof data !== 'undefined'){
      count = data.length;
      res.sseSetup();
      res.sseSend(data);
    }
  });
  app.get('/:id', function(req, res){
    var id = req.params.id;

  });
}
