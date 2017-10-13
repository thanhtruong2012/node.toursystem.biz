var express = require('express'),
	app = express();
var fs = require('fs');
var port = process.env.PORT || 4000;

var privateKey  = fs.readFileSync(__dirname + '/../../../../../../../../etc/httpd/conf/ssl.key/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/../../../../../../../../etc/httpd/conf/ssl.crt/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var https = require('https').createServer(credentials, app);;
var io = require('socket.io')(https);
var session = require("express-session");
var sessionMiddleware = session({
    secret: "keyboard cat",
	resave:true,
	saveUninitialized:true,
	cookie: {
		maxAge: 36000000,
		secure: false
	},
});
io.of("/tbk").use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(sessionMiddleware);


require('./config')(app, io);
require('./autoload')(app, io);
require('./routes')(app, io);
require('./chat')(app, io);

https.listen(port, function(){
	console.log('Your application is running on https://localhost:' + port);
});

const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

process.on('uncaughtException', function (err) {
  logger.error(
	'Caught exception: ' + err.message + "\n" +
	'Stack: '+ err.stack + "\n"
  );
  process.exit();
});

