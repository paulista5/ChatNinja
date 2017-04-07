var groupModel = require('./groupModel.js');
var userModel = require('./userModel.js');

var updateUser =  function(id, userName, callback){
    var newUser = new userModel({groupId: id, userName: userName});
    newUser.save(function(err, doc){
      if(err) {
        console.log(err);
        return;
      }
      else {
        var userId = doc._id;
        groupModel.findById(id, function(err, group){
        if(err) {
          console.log(err);
          return;
        }
        var count = group.numberOfUsers;
        //if(position === 'undefined') position = 0;
        count++;
        groupModel.findOneAndUpdate({_id: id}, {$set:{numberOfUsers:count}}, function(err){
          if(err) {
            console.log(err);
            return;
          }
          callback(doc);
        });
    });
  }
});

}
module.exports = updateUser;
