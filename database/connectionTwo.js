var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var collectionName = 'UserNames';
var mongoUri = 'mongodb://localhost/' + collectionName;
var connection = null;

module.exports = function(){
  if(connection == null){
    connection = mongoose.createConnection(mongoUri);
    connection.on('connected', function(){
      console.log(' User database created !!');
    });
  }
  return connection;
}
