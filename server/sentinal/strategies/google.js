'use strict';

/**
 * Module depenencies
 * @type {exports}
 * @private
 */
var _ = require('lodash');
var qs = require('querystring');
var request = require('superagent');

/**
 * `GoogleStrategy` constructor
 * @param config
 * @returns {Object}
 * @constructor
 */
function GoogleStrategy(config) {
  
  _.extend(this, config);
  
  var self = this;

  /**
   * Check for necessary elements
   */
  _.each(['client_id', 'client_secret', 'redirect_uri'], function(key) {
    if (!config[key]) {
      throw new Error('Must supply Google Strategy with '+key);
    }
  });

  self.oauth_url = 'https://accounts.google.com/o/oauth2/auth?';
  self.access_token_url = 'https://accounts.google.com/o/oauth2/token?';
  self.profile_url = 'https://www.googleapis.com/plus/v1/people/me?';

  self.authorize = function(req, res) {
    res.redirect(self.oauth_url+qs.stringify({
      response_type: 'code',
      client_id: self.client_id,
      redirect_uri: self.redirect_uri,
      scope: 'email profile'
    }));
  };

  self.callback = function(req, res, next) {
    return request
      .post(self.access_token_url)
      .type('form')
      .send({
        code: req.query.code,
        client_id: self.client_id,
        client_secret: self.client_secret,
        redirect_uri: self.redirect_uri,
        grant_type: 'authorization_code'
      })
      .end(function(response) {
        var access_token = JSON.parse(response.text).access_token;

        self.get_profile(access_token, function(response) {
          req._oauth = {
            token: access_token,
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
  return new GoogleStrategy(config);
};
