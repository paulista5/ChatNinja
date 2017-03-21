var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionName = 'ChatNinjaCollection';
var userModelSchema = new Schema({
  groupId: String,
  userName: String,
});

var userDatabase = mongoose.model('userDatabase', userModelSchema, collectionName);
module.exports = userDatabase;
