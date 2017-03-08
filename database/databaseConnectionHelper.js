var mongoose = require('mongoose');

mongoose.Promise  = global.Promise;

module.exports = function(){
  before(function(done){
    mongoose.connect('mongodb://localhost/groupDatabase');
    mongoose.connection.once('open', function(){
      console.log('Connection to database successfull');
      done();
    }).on('error', function(error){
      console.log('Connection error:', error);
    });
  })

  }
