'use strict';

// Module dependencies
var _ = require('lodash');
var Backbone = require('backbone');

/**
 * Create BaseStore
 * @type {Backbone.Collection}
 */
var BaseStore = Backbone.Collection.extend({

  /**
   * List of records in store
   * @type {array}
   */
  _records: [],

  /**
   * Emit change event
   * @param {*} data
   */
  emitChange: function(data) {
    this.emit('change', data);
  },

  /**
   * Add change listener
   * @param {Function} callback
   */
  addChangeListener: function(callback) {
    this.on(this.changeEvent, callback);
  },

  /**
   * Remove change listener
   * @param {Function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(this.changeEvent, callback);
  }

});

module.exports = BaseStore;
