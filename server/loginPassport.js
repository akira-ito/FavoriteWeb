var PassportLocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('mongoose').model('User');
var config = require('../config')();

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
    User.findOne({username: username}, function(err, user){
      if (err)
        done(err);
      else if (!user)
        done(null, false, req.flash('error', 'Ususario não cadastrado.'));
      else if (!user.authenticate(password))
        done(null, false, req.flash('error', 'Senha incorreta.'));
      else
        done(null, user);
   })
  }
);

module.exports.signUp = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function (req, username, password, done){
    process.nextTick(function(){
      User.findOne({username: username}, function(err, user){
        console.log(err, user);
        if (err)
          done(err);
        else if (user)
          done(null, false, req.flash('error','Usuário já existe'));
        else{
          var user = new User();
          user.name = req.body['name'];
          user.email = req.body['email'];
          user.username = req.body['username'];
          user.password = req.body['password'];

          user.save(function(err, newUser){
            if (err)
              done(err);
            else
              done(null, newUser);
          });
        }
     });
   });
  }
);
module.exports.google = new GoogleStrategy({
    clientID        : config.auth.google.clientID,
    clientSecret    : config.auth.google.clientSecret,
    callbackURL     : config.auth.google.callbackURL,
  }, function(token, refreshToken, profile, done){
    console.log(token, refreshToken, profile);
    done(null, {username: 25555});
  }
);
