var dbModel = require('./groupModel.js');

module.exports = function(data, callback){
  var newGroup = new dbModel({groupName: data.groupName, discussionTopic: data.discussionTopic
  , numberOfUsers: data.numberOfUsers});
  newGroup.save(function(err, doc){
    if(err){
      return;
    }
    callback(doc);
  });
}
