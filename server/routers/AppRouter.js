'use strict';

// Create router
var cthulhu = require('cthulhu');
var router = cthulhu.Router();

/**
 * Render static/about.jade
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
router.about = function(req, res) {
  res.render('static/about');
};

/**
 * Handler for errors
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Object} config
 *     @params {String} config.msg Message to display in flash message
 *     @params {String} config.url Url for redirect
 */
router.error = function(err, req, res) {
  var message = 'There was an issue processing your request.';
  req.flash('error', err.message || message);
  res.redirect('/');
};

/**
 * Render layout for all other routes
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 */
router.all = function(req, res) {
  if (req.isAuthenticated()) {
    res.render('layout', { current_user: req.user });
  } else {
    res.render('home');
  }
};

router.get('/about', router.about);
router.get('/error', router.error);
router.get('*', router.all);

module.exports = router;
