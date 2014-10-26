'use strict';

var _ = require('lodash');
var BaseStore = require('./BaseStore');
var service = require('../service/api');

/**
 * Store to hold current user
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../service/api
 */
var UserStore = BaseStore.new({

  /**
   * @type {?object}
   */
  _user: undefined,

  /**
   * Load currently authenticated user from API
   */
  load: function() {
    service
      .get('/api/me')
      .then(function(response) {
        UserStore._user = response;
        UserStore.emit('loaded', UserStore._user);
      });
    return UserStore;
  },

  /**
   * Return user currently logged in
   * @returns {Object}
   */
  getUser: function() {
    return UserStore._user;
  },

  /**
   * Return array of user's social media accounts
   * @return {array}
   */
  getUserAccounts: function() {
    return _.pick(UserStore._user || {}, function(value, key) {
      return _.contains(['facebook', 'google', 'foursquare', 'twitter', 'github'], key);
    });
  },

  /**
   * Return user's access token
   * @return {string}
   */
  getAccessToken: function() {
    return UserStore._user ? UserStore._user.accessToken : undefined;
  }

});

module.exports = UserStore;
