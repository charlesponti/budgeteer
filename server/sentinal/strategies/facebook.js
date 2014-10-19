'use strict';

/**
 * Module dependencies
 * @type {exports}
 */
var _ = require('lodash');
var qs = require('querystring');
var request = require('superagent');

/**
 * Export Facebook module
 * @param {Object} options
 * @returns {module}
 * @constructor
 */
function FacebookStrategy(options) {
  /**
   * Extend `this` with passed options
   */
  _.extend(this, options);

  /**
   * Check for necessary elements
   */
  ['app_id', 'callback_url', 'app_secret'].forEach(function(key) {
    if (!options[key]) {
      throw new Error('Must supply Facebook with '+key);
    }
  });

  var self = this;

  self.oauth_route_url = 'https://www.facebook.com/dialog/oauth?';
  self.access_token_url = 'https://graph.facebook.com/oauth/access_token';
  self.profile_url = 'https://graph.facebook.com/me';

  /**
   * Send request to authorize request to Facebook
   * @param {http.IncomingMessage} req
   * @param {express.response} res
   * @param {Function} next
   */
  self.authorize = function(req, res, next) {
    res.redirect(self.oauth_route_url + qs.stringify({
      client_id: self.app_id,
      state: res.locals._csrf,
      redirect_uri: self.callback_url,
      scope: 'public_profile,email'
    }));
  };

  self.callback = function(req, res, next) {
    return request
            .get(self.access_token_url)
            .query({
                client_id: self.app_id,
                redirect_uri: self.callback_url,
                client_secret: self.app_secret,
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
                self.get_profile(token, function(response) {
                  req._oauth = {
                    token: token,
                    profile: JSON.parse(response.text)
                  };
                  return next();
                });
              });
  };

  self.get_profile = function(access_token, callback) {
    return request
            .get(self.profile_url)
            .query({ access_token: access_token })
            .end(callback);
  };

}

module.exports = function(config) {
  return new FacebookStrategy(config);
};
