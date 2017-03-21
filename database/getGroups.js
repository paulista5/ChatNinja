var dbModel = require('./model/groupModel.js');
var data;
module.exports = function(callback){
  dbModel.find({}, function(err, groups){
    if(err) handleError(err);
    data = groups;
    callback(data);
  });
}
