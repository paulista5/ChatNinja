var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupModelSchema = new Schema({
  name: String,
  users: [{position: Number, userName: String}]
});

var database = mongoose.model('groupDatabase', groupModelSchema);
module.exports = database;
