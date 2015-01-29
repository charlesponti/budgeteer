'use strict';

/**
 * @desc Determine if application is running in development. Used for configs
 * @type {Boolean}
 */
var isDevelopment = process.env.NODE_ENV === 'development';

// Require node-jsx for ReactJS server-side rendering
require('node-jsx').install({extension: '.jsx'});

// Modules dependencies
var app = require('cthulhu');
var auth = require('cthulhu-auth');
var config = require('../config');
var mongoose = require('mongoose')
var util = require('util');

// Instantiate models
require('./models/user');
require('./models/task');
require('./models/weight');
require('./models/category');

// Get User model
var User = mongoose.model('User');

app.configure({
  port: 3000,
  public: '../static',
  views: '../views',
  sessionSecret: 'meerkatmanorrox',
  sessionStore: 'myapp-sessions',
  appName: 'My Super Awesome App Name',
  passRoutes: ['api', 'auth']
});

app.db = require('./db');

app.meow = 'Cats';

// Initialize cthulhu-auth
app.use(auth.setup);

// Deserialize user from session
app.use(auth.deserializeUser(function(user, done) {
  User.findOne(user._id).exec(done);
}));

// Configure Google OAuth strategy
auth.use('Google', config.google);

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
