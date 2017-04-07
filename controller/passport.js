var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var user = require(path.join(__dirname,'..','/database/adminClass'));


module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    if(id == user.id){
      done(null, user);
    }
  });
  passport.use('local-login', new LocalStrategy({
    usernameField: 'loginId',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done){
      if(user.loginId != username){
        console.log('wronguser!!');
        return done(null, false, {message:'invalid username'});
      }
      if(!user.validPassword(password)){
        console.log('wrongpass!!');
        return done(null, false, {message: 'Oops!! Wrong Password'});
      }
      return done(null, user);
  }
));
}
