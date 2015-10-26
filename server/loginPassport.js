var PassportLocalStrategy = require('passport-local').Strategy;

module.exports.serializeUser = function(user, done) {
  console.log('serializeUser', user);
  done(null, user);
};

module.exports.deserializeUser = function(id, done) {
  console.log('deserializeUser', id);
  done(null, id);
};

module.exports.local = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function (req, username, password, done){
   console.log(username, password, "ddd");
    if (username == "edson"){
      return done(null, {username: "Edson Akira ito", email:"dfd@ddd.com"})
    }else{
      return done(null, false, req.flash('error', 'Ususario ou senha inválida.') );
    }
  }
)
