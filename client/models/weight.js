'use strict';

var Backbone = require('backbone');

var WeightModel = Backbone.Model.extend({

  /**
   * @desc API url for model
   * @type {String}
   */
  url: '/api/weight',

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

  getDate: function() {
    return new Date(this.get('date'));
  }

});

module.exports = WeightModel;
