'use strict';

var _ = require('lodash');
var request = require('superagent/lib/client');
var BaseStore = require('./BaseStore');

/**
 * Store to hold current user
 * @requires module: lodash
 * @requires module: superagent/lib/client
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
    request
      .get('/api/me', function(response) {
      this._user = response.body;
      this.emit('loaded', this._user);
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