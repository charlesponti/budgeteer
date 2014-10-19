'use strict';

/**
 * Module dependencies
 * @type {[type]}
 */
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var BaseStore = merge(EventEmitter.prototype, {
  
  url: null,

  _records: [],

  getRecords: function() {
    return this._records;
  },

  new: function(newStore) {
    return merge(BaseStore, newStore);
  }

});

module.exports = BaseStore;
