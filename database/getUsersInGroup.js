var userModel = require('./userModel.js');

var getAllUsers = function(groupId, callback){
  userModel.find({groupId: groupId}, function(err, docs){
    if(err) return callback(null);
    callback(docs);
  }).select('userName');
}
module.exports = getAllUsers;
