'use strict';

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

// Instantiate models
require('./models/user');
require('./models/task');
require('./models/weight');
require('./models/category');

// Get User model
var User = mongoose.model('User');

/**
 * Application dependencies
 * @type {exports}
 */
const mailer = require('./mailer');
const logger = require('./logger');

const hour = 3600000;
const day = hour * 24;
const week = day * 7;

const app = express();

/**
 * Current working directory from which cthulhu is being used.
 * @type {String}
 * @private
 */
process.env.INIT_DIR = process.cwd();

// Set views path
app.set('views', path.resolve('../views'));

// Disable view caching
app.set('view cache', false);

// Set view engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// Disable view caching if in development
if (global._env === 'development') {
  app.set('view cache', false);
  swig.setDefaults({
    cache: false,
    autoescape: false
  });
}
else {
  swig.setDefaults({autoescape: false});
}

/**
 * @desc Required configuration settings
 * @type {Array}
 */
var requiredConfigs = [
  'port'
];

/**
 * Check for required configuration options. Throw error if any required
 * fields are missing.
 */
requiredConfigs.forEach(function(requiredConfig) {
  if (!config[requiredConfig]) {
    throw new Error('Must supply '+ requiredConfig);
  }
});

// Set port
app.set('port', 3000);

/**
 * Allow for the use of HTTP verbs such as PUT or DELETE in places
 * where the client doesn't support it.
 */
app.use(methodOverride());

// Add nodemailer
app.mailer = mailer(config.mailer);

/**
 * Add function for creating new winston logs
 * @param {string} loggerName Name of logger
 * @param {string} logFile Path to log file
 * @param {object} config Logger configuration
 * @type {Function}
 */
app.addLogger = function(options) {
  app.loggers = app.loggers || {};

  app.loggers[options.name] = logger({
    dir: options.dir,
    file: options.file
  }, config);

  return app;
};

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

// Add `morgan` for logging HTTP requests.
var morganConfig = config.morgan || 'dev';

app.logger = logger({
  dir: 'logs'
});

app.use(morgan(morganConfig, {
  stream: {
    write: function(message) {
      return app.logger.info(message)
    }
  }
}));

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

//if (config.sessionSecret) {
//  // Enable session middleware
//  app.use(require('./session')(app, config.session));
//  // Enable security middleware
//  app.use(require('./security')(app, config.lusca));
//}

app.server = http.Server(app);

app.start = function() {
  var env = app.get('env');
  var port = app.get('port');

  // Add socket to app and begin listening.
  app.socket = io(app.server);

  // Start application server.
  app.server.listen(port, function() {
    return util.log('Cthulhu has risen at port '+port+' in '+env+' mode')
  });

  // Emit initial message
  app.socket.on('connection', function(socket) {
    return socket.emit('message', {
      message: 'Cthulhu has you in her grips.'
    });
  });

  return app;
};

app.db = require('./db');

// Add `locals` to response object
app.use(function(req, res, next) {
  res.locals.appName = 'Backpack';
  res.locals.bundle = isDevelopment ? 'main' : 'main.min';
  return next();
});

// Add router to application stack
app.use(require('./routers'));

// Add error handler to application stack
app.use(function(err, req, res) {
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

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

// Export app
module.exports = app;
