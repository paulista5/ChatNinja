var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = require('./connectionOne.js');
var db = conn();
var groupModelSchema = new Schema({
  groupName: String,
  discussionTopic: String,
  numberOfUsers: Number
});

var groupDatabase = db.model('groupDatabase', groupModelSchema);
module.exports = groupDatabase;
