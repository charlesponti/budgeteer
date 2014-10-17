'use strict';

/**
 * Module dependencies
 * @type {[type]}
 */
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var TasksStore = merge(EventEmitter.prototype, {

  _records: [],

  getRecords: function() {
    return this._records;
  }

});

module.exports = TasksStore;
