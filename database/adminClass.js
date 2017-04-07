var bcrypt = require('bcrypt-nodejs');

var adminName = 'admin';
var adminPassword = 'adminpass';
var user = {
  id:'xyz',
  loginId:'admin',
  password: 'adminpass',

  generateHash: function(password){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },

  validPassword: function(userpassword){
    return bcrypt.compareSync(this.password, this.generateHash(userpassword));
  }
};

module.exports = user;
