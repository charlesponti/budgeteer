'use strict';

/**
 * Current Node environment
 * @private
 */
var env = process.env.NODE_ENV;

/**
 * Module dependencies.
 * @private
 */
var _ = require('lodash');
var util = require('util');
var http = require('http');
var swig = require('swig');
var path = require('path');
var amqp = require('amqp');
var lusca = require('lusca');
var io = require('socket.io');
var morgan = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var flash = require('express-flash');
var compress = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var express_session = require('express-session');
var express_validator = require('express-validator');
var MongoStore = require('connect-mongo')(express_session);

/**
 * Application dependencies
 */
var auth = require('./util/auth');
var oauth = require('./util/oauth');
var mailer = require('./util/mailer');
var logger = require('./util/logger');
var middleware = require('./util/middleware');

/**
 * Create time variables for use in Time-To-Live settings
 * @type {Number}
 */
var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * Factory function that creates a new Express application using
 * supplied configuration.
 * @param {Object} config Initial configuration of application
 * @private
 */
function cthulhu(config) {

  var app = express();

  /**
   * Store config
   */
  app._config = config;

  /**
   * Set oauth
   */
  app.oauth = oauth(config.OAuth);

  /**
   * Set port. First check configuration or use 3000 as a fallback.
   */
  app.set('port', config.port || 4000);

  /**
   * Set mailer
   */
  app.mailer = mailer(config.Mailer);

  app.use(favicon(__dirname + '/../public/favicon.ico'));


  app.use(middleware.logger);

  app.logger = logger;
  app.use(morgan('dev', { stream: app.logger.stream }));

  /**
   * Set folder for static files (javascript and css)
   */
  app.use(
    express.static(
      path.join(__dirname, config.static),
      { maxAge: week } // TTL (Time To Live) for static files
    )
  );

  /**
   * Set directory where views are stored.
   */
  app.set('views', path.join(__dirname, config.views || './views'));

  /**
   * Set view engine
   */
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');

  /**
   * Disable view caching
   */
  app.set('view cache', false);
  swig.setDefaults({ cache: false });

  /**
   * Compress static files
   */
  app.use(compress());

  /**
   * Parse body of requests
   */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express_validator());
  app.use(methodOverride());

  /**
   * Parse cookies
   */
  app.use(cookieParser());

  /**
   * 500 Error Handler.
   */
  app.use(errorHandler());

  app.use(function(req, res, next) {
    req.isAuthenticated = auth.isAuthenticated;
    req.login = auth.logIn;
    req.logout = auth.logOut;
    next();
  });

  /**
   * Create session store
   */
  app.use(express_session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: new MongoStore({
      db: config.sessionStore
    })
  }));

  // Connect to RabbitMQ
  app.rabbitConnection = amqp.createConnection({
    host: 'localhost'
  });

  /**
   * Application's RabbitMQ queues
   * @type {object}
   */
  app.queues = {};

  /**
   * Make new RabbitMQ message queue
   * @param {string} name Name of queue
   */
  app.addQueue = function(name) {
    var msg;

    if (app.queues[name]) {
      msg = name+' queue already exists';
      util.log(msg);
    }

    app.queues[name] = app.rabbitConnection.queue(name);
    msg = name+' queue is ready for use';
    util.log(msg);
  };

  /**
   * Retrive RabbitMQ queue
   * @param {string} name Name of queue
   */
  app.getQueue = function(name) {
    return app.queues[name];
  };

  /**
   * Application's RabbitMQ exchanges
   * @type {object}
   */
  app.exchanges = {};

  /**
   * Make new RabbitMQ message exchange
   * @param {string} name Name of exchange
   */
  app.addExchange = function(name) {
    var msg;

    if (app.exchanges[name]) {
      msg = name+' exchange already exists';
      util.log(msg);
    }

    app.exchanges[name] = app.rabbitConnection.exchange(name);
    msg = name+' exchange is ready for use';
    util.log(msg);
  };

  /**
  * Retrive RabbitMQ queue
  * @param {string} name Name of queue
  */
  app.getExchange = function(name) {
    return app.exchanges[name];
  };

  // Log message when connected to RabbitMQ
  app.rabbitConnection.on('ready', function() {
    app.logger.info('RabbitMQ connected.');
  });

  /**
   * Deserialize user from session
   */
  app.use(auth.deserializeUser);

  /**
   * Remember original destination before login.
   */
  app.use(middleware.remember({
    passRoutes: [ "auth", "login","logout","signup","fonts","favicon" ]
  }));

  /**
   * Enable flash messages
   */
  app.use(flash());

  /**
   * Serve either dev or min version of javascript depending on
   * environment.
   */
  app.use(middleware.serve_bundle);

  /**
   * Set up Sentianl CORS headers
   */
  app.use(middleware.cors);

  /**
   * Enable Lusca security
   */
  app.use(lusca({
    csp: {
      default_src: "'self'",
      script_src:  "'self'",
      image_src: "'self'",
    },
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true
    },
    xssProtection: true
  }));

  /**
   * Add CSRF (Cross-Site Request Forgery) protection
   */
  app.use(middleware.csrf);

  /**
   * Set local variables for use in views
   */
  app.use(middleware.locals({
    appName: config.appName
  }));

  app.securePath = function(req, res, next) {
    var message = 'You must be logged in to access this resource';
    if (req.isAuthenticated()) {
      next();
    } else if (/api/.test(req.baseUrl)) {
      res.status(401).json({
        message: message
      });
    } else {
      req.flash('error', message);
      res.redirect('/');
    }
  };

  /**
   * Connect to database
   */
  var db = config.DB;
  mongoose.connect(db, function(err) {
    if (err) {
      return console.log(err);
    }
    app.db = mongoose.connection;
    app.logger.info('Connected to '+db+' database.');
  });

  /**
   * Start Cthulhu.
   */
  app.start = function() {
    /**
     * Create server
     */
    var server = http.createServer(app);

    /**
     * Add socket to app and begin listening on port.
     */
    app.socket = io.listen(server).sockets;

    /**
     * Emit initial message
     */
    app.socket.on('connection', function(socket) {
      socket.emit('born', { message: 'Cthulhu has you in its grips.' });
    });

    /**
     * Start application server.
     */
    server.listen(app.get('port'), function() {
      app.logger.info('Cthulhu has risen at port '+app.get('port')+' in '+app.get('env'));
    });
  };

  return app;

}

/**
 * Export factory that returns new express.Application
 * @return {express.Application}
 */
module.exports = function() {
  /**
   * Get application configuration
   * @type {Object}
   */
  var config = require('./config');

  /**
   * Check if there is a current instance of the applicaton. If so, return that
   * instance. If not, create new application, attach to GLOBAL, and return it.
   */
  if (!cthulhu._instance) {
    GLOBAL.Cthulhu =
    cthulhu._instance = cthulhu(config);

    /**
     * Setup Cthulhu routes
     */
    cthulhu._instance.use(require('./routers'));
  }

  return cthulhu._instance;
};
