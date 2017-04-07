var dbModel = require('./groupModel.js');
var data;
module.exports = function(callback){
  dbModel.find({}, function(err, groups){
    if(err) return;
    callback(groups);
  });
}
