var configJSON = require('./config.json');
var authJSON = require('./auth.json');

module.exports = function(){
  var appEnv = process.env.APP_ENV || 'DES';
  var config = configJSON[appEnv];
  config.auth = authJSON;

  return config;
}
