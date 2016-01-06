'use strict';

// Load environment variables
require('dotenv').load();

/**
 * Current Node environment
 * @type {String}
 * @private
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * @desc Determine if application is running in development. Used for configs
 * @type {Boolean}
 */
var isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Module dependencies.
 * @type {exports}
 */
const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressValidator = require('express-validator');
const http = require('http');
const io = require('socket.io');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const util = require('util');
const swig = require('swig');
const config = require('../config');
const enrouten = require('express-enrouten');
const redis = require('redis');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const favicon = require('serve-favicon');

/**
 * Application dependencies
 * @type {exports}
 */
const mailer = require('./mailer');

const hour = 3600000;
const day = hour * 24;
const week = day * 7;

const app = express();


// Set views path
app.set('views', path.resolve('views'));

// Disable view caching
app.set('view cache', false);

// Set view engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// Disable view caching if in development
if (process.env.NODE_ENV === 'development') {
  app.set('view cache', false);

  swig.setDefaults({
    cache: false,
    autoescape: false
  });
}
else {
  swig.setDefaults({autoescape: false});
}

// Set port
app.set('port', 3000);

/**
 * Allow for the use of HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it.
 */
app.use(methodOverride());

// Add nodemailer
app.mailer = mailer(config.mailer);

// Set folder for static files.
if (config.public) {
  app.use(
    express.static(
      path.resolve(process.env.INIT_DIR, config.app),
      { maxAge: week } // TTL (Time To Live) for static files
    )
  )
}

// Add `compression` for compressing responses.
app.use(compress());

app.use(expressSession({
  // Do not save session if nothing has been modified
  resave: false,
  // Do not create session unless something is to be stored
  saveUninitialized: false,
  secret: 'foobar'
}));

// Add `morgan` for logging HTTP requests.
app.use(morgan('dev'));

// Add `body-parser` for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Add `express-validator`
 * This module allows values in req.body to be validated with the use of
 * helper methods.
 */
app.use(expressValidator());

// Add cookie-parser
app.use(cookieParser());

app.db = require('./db');

// Add `locals` to response object
app.use(function(req, res, next) {
  res.locals.bundle = isDevelopment ? 'main' : 'main.min';
  return next();
});

// Serve favicon
app.use(favicon(path.resolve(__dirname, '../client/favicon.ico')));
// Add routes to application stack
app.use(enrouten({directory: 'controllers'}));

// Add error handler to application stack
app.use(function(req, res) {
  // Render 500.html with error message
  return res.status(500).json({error: 'Error'});
});

// Setup RabbitMQ
// queues.setup(app);

var port = app.get('port');
var env = app.get('env');
var server = http.Server(app);

// Add socket to app and begin listening.
app.socket = io(server);

// Start application server.
server.listen(port, function() {
  return util.log('Cthulhu has risen at port '+port+' in '+env+' mode')
});

// Emit initial message
app.socket.on('connection', function(socket) {
  return socket.emit('message', {message: 'Cthulhu has you in her grips.'});
});

