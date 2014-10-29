'use strict';

/**
 * Module dependencies
 * @type {exports}
 */
var express = require('express');

/**
 * Application dependencies
 * @type {exports}
 */
var oauth = Cthulhu.oauth;
var User = require('../models/user');
var UserRouter = require('./UserRouter');

/**
 * Create Express router
 */
var router = express.Router();

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
 * Callback used after User table is queried for user's with specified
 * email
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
router.linkOauth = function(req, res, next) {
  var oauth = req._oauth;
  var onOauthLinked = router.onOauthLinked.bind(router, req, res);
  var query = router.getOauthUserQuery(oauth.provider, oauth.profile);

  User
    .findOne(query)
    .exec(function(err, user) {
      if (err) {
        req.flash('error', 'There was an unexpected server error.');
        return res.status(500).redirect(req.user ? '/account' : '/login');
      }

      user = user || new User();
      user.linkOAuth(oauth, onOauthLinked);
    });
};

/**
 * Callback for linking Oauth
 * @param {Request} req
 * @param {Response} res
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

  res.render('pop');
};

// Unlink OAuth
router.get('/unlink/:provider', Cthulhu.securePath, UserRouter.unlinkOAuth);

// Facebook
router.get('/facebook', oauth.Facebook.authorize);
router.get('/facebook/callback', oauth.Facebook.callback, router.linkOauth);

// Google
router.get('/google', oauth.Google.authorize);
router.get('/google/callback', oauth.Google.callback, router.linkOauth);

// Twitter
router.get('/twitter', oauth.Twitter.authorize);
router.get('/twitter/callback', oauth.Twitter.callback, router.linkOauth);

// Foursquare
router.get('/foursquare', oauth.Foursquare.authorize);
router.get('/foursquare/callback', oauth.Foursquare.callback, router.linkOauth);

// Github
router.get('/github', oauth.Github.authorize);
router.get('/github/callback', oauth.Github.callback, router.linkOauth);

module.exports = router;
