var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var collectionName = 'GroupNames';
var mongoUri = 'mongodb://localhost/' + collectionName;
var connection = null;

module.exports = function(){
  if(connection == null){
    connection = mongoose.createConnection(mongoUri);
    connection.on('connected', function(){
      console.log(' Group database created !!');
    });
  }
  return connection;
}
