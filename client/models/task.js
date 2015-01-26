'use strict';

var Backbone = require('backbone');

var Task = Backbone.Model.extend({

  /**
   * @desc API url for model
   * @type {String}
   */
  url: '/api/tasks',

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
  }

});

module.exports = Task;
