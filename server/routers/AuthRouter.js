'use strict';

var cthulhu = require('cthulhu');
var auth = require('cthulhu-auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserRouter = require('./UserRouter');

// Create router
var router = cthulhu.Router();

/**
 * Link Facebook account
 * @param {String} provider
 * @param {Object} profile
 */
router.getOauthUserQuery = function(provider, profile) {
  switch(provider) {
    case 'twitter':
    case 'facebook':
    case 'foursquare':
    case 'github':
      return { email: profile.email };
    case 'google':
      return { email: profile.emails[0].value };
    default:
      throw new Error('You have supplied an unsupported provider');
  }
};

/**
 * Find user with OAuth profile assigned to them
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {Function} next
 */
router.linkOauth = function(req, res, next) {
  var oauth = req.oauth;
  var query = router.getOauthUserQuery(oauth.provider, oauth.profile);

  User
    .findOne(query)
    .exec(router.oauthUserFindCallback.bind(router, req, res));
};

/**
 * Link OAuth profile to found user
 * @param  {IncomingMessage} req
 * @param  {ServerResponse} res
 * @param  {?Error} err
 * @param  {?User} user
 */
router.oauthUserFindCallback = function(req, res, err, user) {
  if (err) {
    req.flash('error', 'There was an unexpected server error.');
    return res.status(500).redirect(req.user ? '/account' : '/login');
  }

  user = user || new User();

  user.linkOAuth(req.oauth, router.onOauthLinked.bind(router, req, res));
};

/**
 * Callback for linking Oauth
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {?Error} err
 * @param {?User} user
 */
router.onOauthLinked = function(req, res, err, user) {
  if (err) {
    res.status(500).json({ message: 'Server error' });
    return;
  }

  // Login user if no user logged in
  if (!req.user) {
    req.login(user);
  }

  res.redirect('/');
};

// Unlink OAuth
router.get('/unlink/:provider', UserRouter.unlinkOAuth);

// Google
router.get('/google', auth.Google.authorize);
router.get('/google/callback', auth.Google.callback, router.linkOauth);

module.exports = router;
