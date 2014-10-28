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
 * Construct Google OAuth strategy
 * @param config
 * @returns {Object}
 */
module.exports = function GoogleStrategy(config) {
  
  var strategy = _.extend({}, config);

  /**
   * Check for necessary elements
   */
  _.each(['client_id', 'client_secret', 'redirect_uri'], function(key) {
    if (!config[key]) {
      throw new Error('Must supply Google Strategy with '+key);
    }
  });

  strategy.oauth_url = 'https://accounts.google.com/o/oauth2/auth?';
  strategy.access_token_url = 'https://accounts.google.com/o/oauth2/token?';
  strategy.profile_url = 'https://www.googleapis.com/plus/v1/people/me?';

  strategy.authorize = function(req, res) {
    res.redirect(strategy.oauth_url+qs.stringify({
      response_type: 'code',
      client_id: strategy.client_id,
      redirect_uri: strategy.redirect_uri,
      scope: 'email profile'
    }));
  };

  strategy.callback = function(req, res, next) {
    return request
      .post(strategy.access_token_url)
      .type('form')
      .send({
        code: req.query.code,
        client_id: strategy.client_id,
        client_secret: strategy.client_secret,
        redirect_uri: strategy.redirect_uri,
        grant_type: 'authorization_code'
      })
      .end(strategy.onAuthorizationResponse.bind(this, req, res, next));
  };

  /**
   * Handle authorization response
   * @param {Request} req
   * @param {Response} res
   * @param {function} next
   * @param {object} response
   */
  strategy.onAuthorizationResponse = function(req, res, next, response) {
    var token = JSON.parse(response.text).access_token;
    strategy.get_profile.call(strategy, token, req, res, next);
  };

  /**
   * Handle profile response
   * @param {String} token
   * @param {Request} req
   * @param {Response} res
   * @param {function} next
   * @param {object} response
   */
  strategy.onProfileResponse = function(token, req, res, next, response) {
    req._oauth = {
      token: token,
      provider: 'google',
      profile: response.body
    };
    return next();
  };
    
  /**
   * Get user's Google profile
   * @param  {String}   token
   * @param  {Function} callback
   */
  strategy.get_profile = function(token, req, res, next) {
    return request
      .get(strategy.profile_url)
      .query({ access_token: token })
      .end(strategy.onProfileResponse.bind(strategy, token, req, res, next));
  };

  return strategy;

};
