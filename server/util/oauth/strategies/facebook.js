'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var qs = require('querystring');
var request = require('superagent');

/**
 * Export Facebook OAuth Strategy
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function FacebookStrategy(options) {

  /**
   * Check for necessary elements
   */
  ['app_id', 'callback_url', 'app_secret'].forEach(function(key) {
    if (!options[key]) {
      throw new Error('Must supply Facebook with '+key);
    }
  });

  var strategy = _.extend({}, options);

  strategy.oauth_route_url = 'https://www.facebook.com/dialog/oauth?';
  strategy.access_token_url = 'https://graph.facebook.com/oauth/access_token';
  strategy.profile_url = 'https://graph.facebook.com/me';

  /**
   * Send request to authorize request to Facebook
   * @param {http.IncomingMessage} req
   * @param {express.response} res
   * @param {Function} next
   */
  strategy.authorize = function(req, res, next) {
    res.redirect(strategy.oauth_route_url + qs.stringify({
      client_id: strategy.app_id,
      state: res.locals._csrf,
      redirect_uri: strategy.callback_url,
      scope: 'public_profile,email'
    }));
  };

  strategy.callback = function(req, res, next) {
    request
      .get(strategy.access_token_url)
      .query({
          client_id: strategy.app_id,
          redirect_uri: strategy.callback_url,
          client_secret: strategy.app_secret,
          code: req.query.code
      })
      .end(function(response) {
        /**
         * Parse query string returned from Facebook
         */
        var query = qs.parse(response.text);

        /**
         * Get access_token
         * @type {String}
         */
        var token = query.access_token;

        /**
         * Get user's Facebook profile
         */
        strategy.get_profile(token, function(response) {
          req._oauth = {
            token: token,
            provider: 'facebook',
            profile: JSON.parse(response.text)
          };
          return next();
        });
      });
  };

  strategy.get_profile = function(access_token, callback) {
    request
      .get(strategy.profile_url)
      .query({ access_token: access_token })
      .end(callback);
  };

  return strategy;

};
