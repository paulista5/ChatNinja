var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionName = 'ChatNinjaCollection';
var groupModelSchema = new Schema({
  groupName: String,
  discussionTopic: String,
  numberOfUsers: Number
});

var groupDatabase = mongoose.model('groupDatabase', groupModelSchema, collectionName);
module.exports = groupDatabase;
