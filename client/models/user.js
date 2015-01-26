'use strict';

var _ = require('lodash');
var Backbone = require('Backbone');


var User = Backbone.Model.extend({

  /**
   * @desc API url for model
   * @type {String}
   */
  url: '/api/me',

  /**
   * @desc Identifier of model
   * @type {String}
   */
  idAttribute: '_id',

  /**
   * @desc Parse response from server
   * @param  {Object} response Response from API
   * @param  {Object} options Options of request
   * @return {Object}
   */
  parse: function(response, options) {
    if (options.collection) return response;
    return response.data;
  },

  /**
   * @desc Return array of users connected accounts
   * @return {Array}
   */
  getAccounts: function() {
    return _.pick(this.attributes, function(value, key) {
      return _.contains([
        'facebook',
        'google',
        'foursquare',
        'twitter',
        'github'
      ], key);
    });
  }

});

module.exports = User;
