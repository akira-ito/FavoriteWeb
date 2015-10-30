var Server = require('./server')();

var port = 3000;
if (process.argv.length >= 3 ) {
	port = parseInt(process.argv[2]);
}

Server.loadConfig();
Server.start(port, "127.0.0.1");
