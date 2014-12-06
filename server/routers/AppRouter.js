'use strict';

var router = Cthulhu.Router();

/**
 * Render static/about.jade
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
router.get('/about', function(req, res) {
  res.render('static/about');
});

/**
 * Handler for errors
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Object} config
 *     @params {String} config.msg Message to display in flash message
 *     @params {String} config.url Url for redirect
 *
 * TODO Set up central error logging system
 */
router.get('/error', function(err, req, res) {
  var message = 'There was an issue processing your request. Our unicorns will'+
    ' look into the issue after their trip to Candy Mountain.';
  req.flash('error', err.message || message);
  res.redirect('/');
});

/**
 * Render home
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
router.get('/', function(req, res) {
  if (!req.isAuthenticated()) {
    res.render('home', { user: req.user });
  } else {
    res.render('layout');
  }
});

/**
 * Render layout for all other routes
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
router.get('*', function(req, res) {
  res.render('layout', { user: req.user });
});

module.exports = router;
