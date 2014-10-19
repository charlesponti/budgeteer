'use strict';

/**
 * Module dependencies
 * @type {[type]}
 */
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var TasksStore = merge(EventEmitter.prototype, {

  _records: [],

  load: function() {
    var self = this;
    return App.API.get('tasks').then(function(data) {
      self._records = data.tasks;
      self.emit('loaded');
    });
  },

  getRecords: function() {
    return this._records;
  }

});

module.exports = TasksStore;
