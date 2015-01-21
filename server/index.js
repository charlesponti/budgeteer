'use strict';

// Require node-jsx for ReactJS server-side rendering
require('node-jsx').install({extension: '.jsx'});

// Modules dependencies
var util = require('util');
var http = require('http');
var path = require('path');
var swig = require('swig');
var lusca = require('lusca');
var io = require('socket.io');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var connectMongo = require('connect-mongo');
var expressLogger = require('express-logger');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var auth = require('cthulhu-auth');

// Instantiate models
require('./models/user');
require('./models/task');
require('./models/weight');
require('./models/category');

/**
 * Application dependencies.
 * @private
 */
var config = require('./config');
var queues = require('./lib/queues');

var User = mongoose.model('User');
var oauth = config.OAuth;

// Store
var MongoStore = connectMongo(expressSession);

// Application configuration
var config = require('./config');

// Create new Express application
var app = express();

// Set application port
app.set('port', config.port || 3000);

swig.setDefaults({
  autoescape: false
});

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

// Set views folder
app.set('views', path.resolve(__dirname, config.views  || './views'));

// Set public folder
app.use(express.static(path.resolve(__dirname, config.public || '../public')));

// Set up logging system
switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;
  case 'production':
    app.use(expressLogger({
      path: "" + __dirname + "/log/requests.log"
    }));
}

// Add lusca
app.use(lusca({
  csp: {
  default_src: "'self'",
  script_src: "'self'",
  image_src: "'self'"
},
xframe: 'SAMEORIGIN',
p3p: 'ABCDEF',
hsts: {
  maxAge: 31536000,
  includeSubDomains: true
},
xssProtection: true
}));

app.use(methodOverride());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(compression());

app.use(cookieParser(config.cookieSecret));

app.use(expressSession({
  resave: true,
  saveUninitialized: false,
  secret: config.sessionSecret,
  store: new MongoStore({
    db: config.sessionStore
  })
}));

app.db = require('./db');

// app.mailer = require('./config/mailer')(config.mailer);

// Use favicon
app.use(favicon(__dirname + '/../public/favicon.ico'));

// Initialize cthulhu-auth
app.use(auth.setup);

// Deserialize user from session
app.use(auth.deserializeUser(function(user, done) {
  User.findOne(user._id).exec(done);
}));

// Set oauth strategies
auth.use('Facebook', config.facebook);
auth.use('Google', config.google);
auth.use('Twitter', config.twitter);
auth.use('Foursquare', config.foursquare);
auth.use('Github', config.github);

// Add `locals` to response object
app.use(function(req, res, next) {
  res.locals.appName = 'Backpack';
  return next();
});

// Add router to application stack
app.use(require('./routers'));

// Add error handler to application stack
app.use(function(err, req, res, next) {
  // Log erorr message
  util.log(err.stack);

  // Return JSON response if request is to /api
  if (req.xhr) {
    return res.status(500).json({ message: err.message });
  }

  // Render 500.html with error message
  return res.status(500).render('500', {
    error: err.message
  });
});

// Setup RabbitMQ
// queues.setup(app);

/**
 * Start application
 */
app.start = function() {
  var port = app.get('port');
  var server = http.createServer(app);

  // Add socket to app and begin listening.
  app.socket = io.listen(server).sockets;

  // Emit initial message
  app.socket.on('connection', function(socket) {
    socket.emit('message', { message: 'Cthulhu has you in its grips.' });
  });

  return server.listen(port, function() {
    return util.log("Server run in " + (app.get('env')) + " mode on port " + (port));
  });
};

// Export app
module.exports = app;
