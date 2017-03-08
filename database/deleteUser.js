var dbModel = require('/model/modelDescription.js');

var updateUser = function(id, position, callback){
  dbModel.update({_id: id}, {$pull:{"users":{position: position}}}, function(err){
    if(err) return callback(false);
    return callback(true);
  });
}

module.exports = updateUser;
