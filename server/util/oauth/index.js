"use strict";

/**
 * Module dependencies
 * @type {exports}
 * @private
 */
var _ = require('lodash');

/**
 * Factory function to create a oauth wrapper of oauth strategies
 */
module.exports = function oauth(config) {

  var module = {};

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
    module.Facebook = require('./strategies/facebook')(config.Facebook);
  }

  /**
   * Attach Google OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Google)) {
    module.Google = require('./strategies/google')(config.Google);
  }

  /**
   * Attach Twitter OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Twitter)) {
    module.Twitter = require('./strategies/twitter')(config.Twitter);
  }

  /**
   * Attach Foursquare OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Foursquare)) {
    module.Foursquare = require('./strategies/foursquare')(config.Foursquare);
  }

  /**
   * Attach Github OAuth strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Github)) {
    module.Github = require('./strategies/github')(config.Github);
  }

  /**
   * Attach Authy strategy if configuration exists for it
   */
  if (_.isPlainObject(config.Authy)) {
    module.Authy = require('./strategies/authy')(config.Authy);
  }
  
  return module;

};
