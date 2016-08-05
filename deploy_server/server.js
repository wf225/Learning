// set up ======================================================================
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);

// var mongoose = require('mongoose'); 				// mongoose for mongodb
// var port = process.env.PORT || 8080; 				// set the port
// var database = require('./config/database'); 			// load the database config
// var morgan = require('morgan');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');

// configuration ===============================================================
// mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.set('port', process.env.PORT || 8000);
app.use(express.static('./public')); 	// set the static files location /public/img will be /img for users
// app.use(morgan('dev')); // log every request to the console
// app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'app')));
// app.use(express.static('./app'));

// if (app.get('env') === 'development') {
//     app.use(express.errorHandler());
// }

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
// app.listen(port);
// console.log("Server listening on port " + port);
server.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});