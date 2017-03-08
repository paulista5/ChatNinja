var dbModel = require('/model/modelDescription.js');

var updateUser =  function(id, data, callback){
  var position;
    dbModel.findById(id, function(err, group){
    if(err) handleError(err);
    position = group.users.length;
    if(position === 'undefined') position = 0;
    var newUser = {position: position, userName: data};
    dbModel.update({_id: id}, {$push:{"users": newUser}}, function(err){
      if(err) return callback(-1);
      return callback(position);
    });
  });

}
module.exports = updateUser;
