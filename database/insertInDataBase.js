var dbModel = require('./model/modelDescription.js');

module.exports = function(data, callback){
    dbModel.create(data, function(err){
      if(err) return callback(false);
      return callback(true);
    });

}
