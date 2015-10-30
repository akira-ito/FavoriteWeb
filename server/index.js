var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var expressSession = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var app = express();

var routes = require('./routes');
var models = require('../models')();
var loginPassport = require('./loginPassport');

var Server = function(){
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, '../view'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../bower_components')));
  app.use(expressSession({
    secret: 'keySecrect',
    saveUninitialized: true,
    resave: true
  }));
  app.use(flash());

  passport.use(loginPassport.local);
  passport.use('signUp', loginPassport.signUp);
  passport.use(loginPassport.google);
  passport.serializeUser(loginPassport.serializeUser);
  passport.deserializeUser(loginPassport.deserializeUser);
  app.use(passport.initialize());
  app.use(passport.session());
}

Server.prototype.loadConfig = function () {
  app.get('/', [routes.welcome, routes.logon, routes.home]);
  app.post('/login', routes.login);
  app.route('/signUp').get(routes.signUpView).post(routes.signUp);
  app.get('/auth/google', routes.google);
  app.get('/auth/google/callback', routes.googleCallback);
  app.get('/logout', routes.logout);
};

Server.prototype.start = function (port, host) {
  app.use(routes.notFound)
  .use(routes.error);

  process.on('uncaughtException', function(err) {
    console.log('UncaughtException: ', err);
  });
  var server = app.listen(port, function(){

    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
  })
};

_instanceServer = null;
module.exports = function(){
  if (!_instanceServer)
    _instanceServer = new Server();

  return _instanceServer;
}
