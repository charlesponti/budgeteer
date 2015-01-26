'use strict';

var _ = require('lodash');
var Backbone = require('Backbone');


var User = Backbone.Model.extend({

  idAttribute: '_id',

  /**
   * Return array of users connected accounts
   * @return {array}
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
