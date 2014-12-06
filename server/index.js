'use strict';

/**
 * Module dependencies.
 * @private
 */
var cthulhu = require('cthulhu');
var auth = require('cthulhu-auth');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

/**
* Application dependencies.
* @private
*/
var config = require('./config');
var User = require('./models/user');
var oauth = config.OAuth;

// Set oauth strategies
auth.use('Facebook', oauth.Facebook);
auth.use('Google', oauth.Google);
auth.use('Twitter', oauth.Twitter);
auth.use('Foursquare', oauth.Foursquare);
auth.use('Github', oauth.Github);

// Create application
var app = cthulhu({
  port: 4000,
  public: './public',
  views: './server/views',
  logFile: './server/logs/all-logs.log',
  sessionSecret: config.sessionSecret,
  sessionStore: config.sessionStore
});

// Use favicon
app.use(favicon(__dirname + '/../public/favicon.ico'));

// Initialize cthulhu-auth
app.use(auth.initialize());

// Deserialize user from session
app.use(auth.deserializeUser(function(user, done) {
  User.findOne(user._id).exec(done);
}));

// Connect to database
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

// Add routes to app
app.use(require('./routers'));

// Export app
module.exports = app;
