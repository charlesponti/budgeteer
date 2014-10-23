"use strict";

/**
 * Module dependencies
 * @type {exports}
 * @private
 */
var _ = require('lodash');

/**
 * Factory function to create a oauth wrapper of oauth strategies
 * @private
 */
function oauth(config) {

  var oauth = {};

  /**
   * Check that config was passed
   */
  if (!_.isPlainObject(config)) {
    throw new Error('Must pass configuration object.');
  }

  /**
   * Attach Facebook OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Facebook)) {
    oauth.Facebook = require('./strategies/facebook')(config.Facebook);
  }

  /**
   * Attach Google OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Google)) {
    oauth.Google = require('./strategies/google')(config.Google);
  }

  /**
   * Attach Twitter OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Twitter)) {
    oauth.Twitter = require('./strategies/twitter')(config.Twitter);
  }

  /**
   * Attach Foursquare OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Foursquare)) {
    oauth.Foursquare = require('./strategies/foursquare')(config.Foursquare);
  }

  /**
   * Attach Github OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Github)) {
    oauth.Github = require('./strategies/github')(config.Github);
  }

  /**
   * Attach Authy strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Authy)) {
    oauth.Authy = require('./strategies/authy')(config.Authy);
  }
  
  return oauth;

}

/**
 * Export factory function that returns new Sentinal
 * @param  {Object} config Configuration
 * @return {Sentinal}
 */
module.exports = function(config) {
  return oauth(config);
};
