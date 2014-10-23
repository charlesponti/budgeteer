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
var UserController = require('./user');

/**
 * Create Express router
 * @type {express.Router}
 */
var router = express.Router();

// Unlink OAuth
router.get('/unlink/:provider', Cthulhu.securePath, UserController.unlinkOAuth);

// Facebook
router.get('/facebook', oauth.Facebook.authorize);
router.get('/facebook/callback', oauth.Facebook.callback, UserController.linkFacebook);

// Google
router.get('/google', oauth.Google.authorize);
router.get('/google/callback', oauth.Google.callback, UserController.linkGoogle);

// Twitter
router.get('/twitter', oauth.Twitter.authorize);
router.get('/twitter/callback', oauth.Twitter.callback, UserController.linkTwitter);

// Foursquare
router.get('/foursquare', oauth.Foursquare.authorize);
router.get('/foursquare/callback', oauth.Foursquare.callback, UserController.linkFoursquare);

// Github
router.get('/github', oauth.Github.authorize);
router.get('/github/callback', oauth.Github.callback, UserController.linkGithub);

module.exports = router;
