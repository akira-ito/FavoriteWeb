var passport = require('passport');

module.exports.welcome = function(req, res, next){
  var welcome = req.cookies["welcome"];
  if (welcome){
    next();
  }else{
    res.cookie("welcome", true, {expires: new Date(Date.now()+1000*60*60*24), httpOnly: true });
    res.render('welcome');
  }
};
module.exports.logon = function(req, res, next){
  if (req.isAuthenticated()){
    next();
  }else{
    res.render('login', {message:  req.flash('error')});
  }
};
module.exports.signUpView = function(req, res){
  res.render('signUp', {message: req.flash('error')});
};
module.exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash : true
});
module.exports.signUp = passport.authenticate('signUp', {
  successRedirect: '/',
  failureRedirect: '/signUp',
  failureFlash : true
});
module.exports.google = passport.authenticate('google', {
  scope : ['profile', 'email']
});
module.exports.googleCallback = passport.authenticate('google', {
  successRedirect : '/',
  failureRedirect : '/'
});

module.exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

module.exports.home = function(req, res){
  res.render('home', {user: req.user});
}

module.exports.notFound = function(req, res, next){
  res.status(404);
  res.render('notFound');
};
module.exports.error = function(err, req, res, next){
  res.status(503);
  res.render('error', {err: err});
}
