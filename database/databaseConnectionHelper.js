var mongoose = require('mongoose');

mongoose.Promise  = global.Promise;
var collectionName = 'ChatNinjaCollection';

module.exports = function(){
    mongoose.connect('mongodb://localhost/'+collectionName, function(err){
      if(err)handleError(err);
      console.log('Connection to database successful!!')
    });
  }
