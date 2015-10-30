var mongoose = require('mongoose');
var config = require('../config')();

module.exports = function(){
  mongoose.connection.on("error", function(err) {
    console.log('Mongoose: Falha ao conectar BD: ', err);
  });

  function exit() {
    mongoose.connection.close(function () {
      console.log('Mongoose: Conexão encerrada');
      process.exit(0);
    });
  }
  process.on('SIGINT', exit).on('SIGTERM', exit);

  var db = mongoose.connect(config.databases.mongodb.mongoose);
  require('./user');

  return db;
}
