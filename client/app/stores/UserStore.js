'use strict';

var _ = require('lodash');
var BaseStore = require('./BaseStore');
var service = require('../service/api');
var AppConstants = require('../constants/App');
var AppDispatcher = require('../dispatchers/App');

/**
 * Store to hold current user
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../service/api
 */
var UserStore = BaseStore.extend();

/**
 * @type {?object}
 */
UserStore._user = undefined;

/**
 * Load currently authenticated user from API
 */
UserStore.load = function() {
  service
    .get('me')
    .then(UserStore.onLoadSuccess)
    .catch(UserStore.onLoadFailure);
  return UserStore;
};

/**
 * Handle success response from loading user
 * @param  {object} response
 */
UserStore.onLoadSuccess = function(response) {
  UserStore._user = response;
  UserStore.emitChange();
};

/**
 * Handle failure response from loading user
 * @param  {object} response
 */
UserStore.onLoadFailure = function(response) {

};

/**
 * Emit change event
 */
UserStore.emitChange = function() {
  UserStore.emit('change', UserStore._user);
};

/**
 * Return user currently logged in
 * @returns {Object}
 */
UserStore.getUser = function() {
  return UserStore._user;
};

/**
 * Return array of user's social media accounts
 * @return {array}
 */
UserStore.getUserAccounts = function() {
  return _.pick(UserStore._user || {}, function(value, key) {
    return _.contains(['facebook', 'google', 'foursquare', 'twitter', 'github'], key);
  });
};

/**
 * Return user's access token
 * @return {string}
 */
UserStore.getAccessToken = function() {
  return UserStore._user ? UserStore._user.accessToken : undefined;
};

module.exports = UserStore;
