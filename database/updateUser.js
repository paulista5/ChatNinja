var groupModel = require('./model/groupModel.js');
var userModel = require('./model/userModel.js');

var updateUser =  function(id, userName, callback){
    var newUser = new userModel({groupId: id, userName: userName});
    newUser.save(function(err, doc){
      if(err) handleError(err);
      else {
        var userId = doc._id;
        groupModel.findById(id, function(err, group){
        if(err) handleError(err);
        var count = group.numberOfUsers;
        //if(position === 'undefined') position = 0;
        if(number === 'undefined') count = 1;
        else count++;
        groupModel.findOneAndUpdate({_id: id}, {$set:{numberOfUsers:count}}, function(err){
          if(err)handleError(err);
          callback(doc);
        });
    });
  }
});

}
module.exports = updateUser;
