var dbModel = require('./model/modelDescription');
var data;
module.exports = function(callback){
  dbModel.find({}, function(err, groups){
    if(err) handleError(err);
    data = groups;
    return callback(data);
  }).select('name');
}
