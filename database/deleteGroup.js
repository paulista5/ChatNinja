var dbModel = require('./groupModel.js');

 module.exports = function(id, callback){
  dbModel.findByIdAndRemove(id, function(err){
    if(err){
      callback(false);
    }
    callback(true);
  });
}
