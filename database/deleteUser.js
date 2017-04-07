var groupModel = require('./groupModel.js');
var userModel = require('./userModel.js');

var deleteUser = function(userId, callback){
  userModel.findOneAndRemove({_id:userId},function(err, result){
    if(err) callback(false);
    else {
      var id = result.groupId;
      groupModel.findById(id, function(err, group){
        if(err) {
          console.log(err);
          return;
        }
        var count = group.numberOfUsers;
        if(count== undefined){
          console.log('error finding group or count undefined');
          return;
        }
        count--;
        if(count == 0){
          groupModel.findByIdAndRemove(id, function(err){
            if(err) {
              console.log(err);
              return;
            }
          });
        }
        else{
          groupModel.findOneAndUpdate({_id:id}, {$set:{numberOfUsers:count}}, function (err) {
            if(err) {
              console.log(err);
              return;
            }
            callback(true);
          });
        }
      });
    }
  });
}

module.exports = deleteUser;
