'use strict';

var _ = require('lodash');
var request = require('superagent/superagent');
var BaseStore = require('./BaseStore');

/**
 * Store to hold current user
 * @requires module: lodash
 * @requires module: superagent/superagent
 * @requires module: ./BaseStore
 */
var UserStore = BaseStore.new({

  /**
   * @type {null|object}
   */
  _user: null,

  /**
   * Load currently authenticated user from API
   */
  load: function() {
    request.get('/api/me').end(function(err, response) {
      if (err) {
        throw err
      } else {
        this._user = response.body;
        this.emit('loaded', this._user);
      }
    }.bind(this));
  },

  /**
   * Return user currently logged in
   * @returns {Object}
   */
  getUser: function() {
    return this._user;
  },

  /**
   * Return array of user's social media accounts
   * @return {array}
   */
  getUserAccounts: function() {
    return _.pick(this._user || {}, function(value, key) {
      return _.contains(['facebook', 'google', 'foursquare', 'twitter', 'github'], key);
    });
  }

});

module.exports = UserStore;
