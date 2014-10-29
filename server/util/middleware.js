'use strict';

/**
 * Module dependencies
 * @type {exports}
 */
var _ = require('lodash');
var util = require('util');
var chalk = require('chalk');
var lusca = require('lusca');
var winston = require('winston');
var User = require('../models/user');

/**
 * Create middleware object
 * @type {Object}
 */
var middleware = {};

/**
 * Store default csrf function
 * @type {Function}
 */
middleware._csrf = lusca.csrf();

/**
 * Server either the development version of the minified version of
 * the browseriy bundle based on the NODE_ENV
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
middleware.serve_bundle = function(req, res, next) {
  var suffix = process.env.NODE_ENV === "development" ? "dev" : "min";

  if (req.url === "/scripts/bundle.js") {
    req.url = "/scripts/bundle." + suffix + ".js";
  }

  next();
};

/**
 * Route middleware to set headers
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
middleware.cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers',
    'X-Requested-With, X-Access-Token, X-Revision, Content-Type');

  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

/**
 * Remember original destination before login.
 */
middleware.remember = function(config) {
  if (config.passRoutes && config.passRoutes.join) {
    var passRoutes = new RegExp(config.passRoutes.join("|"), "i");

    return function(req, res, next) {
      var path = req.path.split('/')[1];

      if (passRoutes.test(path)) {
        return next();
      }

      req.session.returnTo = req.path;
      next();
    };
  } else {
    throw new Error("Must supply passRoutes config as Array of strings");
  }
};

/**
 * Log JSON stringified Object to console
 * @param  {String} name Name of object
 * @param  {Object} obj Object to log
 * @return {String}
 */
middleware.logObj = function(name, obj) {
  var log = chalk.green(name) +": " +chalk.cyan(JSON.stringify(obj));
  console.log(log);
};

/**
 * Display information about current IncomingMessage
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
middleware.logger = function(req, res, next) {

  req.log = winston.log;
  req.info = winston.info;
  
  var startTime = new Date();

  // Log params if it isn't empty
  if (_.size(req.params)) {
    middleware.logObj("Params", req.params);
  }

  // Log body if it isn't empty
  if (_.size(req.body)) {
    middleware.logObj("Body", req.body);
  }

  // Log query if it isn't empty
  if (_.size(req.query)) {
    middleware.logObj("Query", req.query);
  }

  next();
};

/**
 * Attach local variables to ServerResponse
 * @return {Function}
 */
middleware.locals = function(config) {
  /**
   * Middleware
   * @param  {IncomingMessage}   req
   * @param  {ServerResponse}   res
   * @param  {Function} next
   */
  return function(req, res, next) {
    if (_.isPlainObject(config)) {
      _.extend(res.locals, config);
    }

    /**
     * Set flash messages to response locals
     */
    res.locals.success_message = {};
    res.locals.error_message = {};

    /**
     * Add current_user(req.user) to response locals
     */
    res.locals.app_name = config.appName || "Cthulhu";
    res.locals.current_user = req.user;
    next();
  };
};

/**
 * Add conditional CSRF protection. If the request is for the api,
 * permissions are checked through the acess_token in req.query. If not,
 * the `_csrf` token is used in req.body.
 * @param  {IncomingMessage}   req
 * @param  {ServerResponse}   res
 * @param  {Function} next
 */
middleware.csrf = function(req, res, next) {
  var access_token = req.query.access_token;
  
  if (/api/.test(req.originalUrl) && access_token) {
    User
      .findOne({ accessToken: access_token })
      .exec(middleware.onApiUser(req, res, next));
    return;
  } 
  
  middleware._csrf(req, res, next);
};

/**
 * Handle database query for user with access_token supplied to /api reqest
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
middleware.onApiUser = function(req, res, next) {
  return function(err, user) {
    if (err) {
      return next(err);
    }

    if (user.accessToken == req.query.access_token) {
      req.user = user;
      return next();
    }
    
    res.status(401).json({ message: 'You must supply access_token.' });
  };
};

module.exports = middleware;
