'use strict';

var _ = require('lodash');
var Backbone = require('backbone');
var AppConstants = require('../app-constants');
var AppDispatcher = require('../app-dispatcher');

/**
 * Store to hold current user
 * @requires module: lodash
 * @requires module: backbone
 * @requires module: ../app-constants
 * @requires module: ../app-dispatcher
 *
 */
var UserStore = Backbone.Collection.extend({

  url: '/api/user',

  /**
   * Return array of users connected accounts
   * @return {array}
   */
  getAccounts: function() {
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

UserStore = new UserStore();
module.exports = UserStore;
