'use strict';

/**
 * Module dependencies
 * @type {[type]}
 */
var Promise = require('es6-promise').Promise;
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var BaseStore = merge(EventEmitter.prototype, {
  
  url: null,

  _records: [],

  load: function() {
    var self = this;
    return App.API.get(self.url).then(function(data) {
      self._records = data.tasks;
      self.emit('loaded', data.tasks);
    });
  },

  getRecords: function() {
    return this._records;
  },

  new: function(newStore) {
    return merge(BaseStore, newStore);
  }

});

module.exports = BaseStore;
