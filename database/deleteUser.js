var groupModel = require('./model/groupModel.js');
var userModel = require('./model/userModel.js');

var deleteUser = function(userId, callback){
  userModel.findOneAndRemove({_id:userId},function(err, result){
    var id = result.groupId;
    if(err) callback(false);
    else {
      groupModel.findById(id, function(err, group){
        var count = group.numberOfUsers;
        count--;
        if(count == 0){
          groupModel.findByIdAndRemove(id, function(err){
            if(err) handleError(err);
          });
        }
        else{
          groupModel.findOneAndUpdate({_id:id}, {$set:{numberOfUsers:count}}, function (err) {
            if(err)handleError(err);
            callback(true);
          });
        }
      });
    }
  });
}

module.exports = deleteUser;
