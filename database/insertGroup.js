var dbModel = require('./model/groupModel.js');

module.exports = function(data, callback){
    dbModel.create(data, function(err){
      if(err) callback(false);
      callback(true);
    });

}
