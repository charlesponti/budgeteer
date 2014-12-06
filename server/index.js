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
var cthulhu = require('cthulhu');
var auth = require('cthulhu-auth');
var util = require('util');
var http = require('http');
var swig = require('swig');
var path = require('path');
var amqp = require('amqp');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var config = require('./config');

var User = require('./models/user');

var app = cthulhu({
  port: 4000,
  public: './public',
  views: './server/views',
  logFile: './server/logs/all-logs.log',
  sessionSecret: config.sessionSecret,
  sessionStore: config.sessionStore
});

app.use(favicon(__dirname + '/../public/favicon.ico'));

app.use(auth.initialize());

/**
 * Deserialize user from session
 */
app.use(auth.deserializeUser(function(user, done) {
  console.log(user);
  User.findOne(user._id).exec(done);
}));

/**
 * Connect to database
 */
app.startDB = function() {
  var db = config.DB;
  mongoose.connect(db, function(err) {
    if (err) {
      return console.log(err);
    }
    app.db = mongoose.connection;
    app.logger.info('Connected to '+db+' database.');
  });
};

var oauth = config.OAuth;

app.oauth = {
  Facebook: auth.Facebook(oauth.Facebook),
  Google: auth.Google(oauth.Google),
  Twitter: auth.Twitter(oauth.Twitter),
  Foursquare: auth.Foursquare(oauth.Foursquare),
  Github: auth.Github(oauth.Github)
};

GLOBAL.Cthulhu = app;

app.use(require('./routers'));

module.exports = app;
