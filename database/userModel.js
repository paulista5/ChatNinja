var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = require('./connectionTwo.js');
var db = conn();
var collectionName = 'ChatNinjaCollection';
var userModelSchema = new Schema({
  groupId: String,
  userName: String,
});

var userDatabase = db.model('userDatabase', userModelSchema);
module.exports = userDatabase;
