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
  
  /**
   * Return store's records
   * @return {array}
   */
  getRecords: function() {
    return this._records || [];
  },

  /**
   * Create an extension of BaseStore
   * @param  {object} newStore
   * @return {object}
   */
  new: function(newStore) {
    return merge(BaseStore, newStore);
  },

  /**
   * Add record
   * @param {object} record
   * @return {TaskStore}
   */
  add: function(record) {
    if (_.isArray(this._records)) {
      this._records.push(record);
    } else {
      this._records = [record];
    }
    return this._records;
  },

  /**
   * Remove record
   * @param  {string} id
   * @return {TaskStore}
   */
  remove: function(id) {
    this._records = _.reject(this._records, function(task) {
      return task._id == id;
    });
    return this;
  },

  /**
   * Update record
   * @param {object} newRecord
   */
  updateRecord: function(newRecord) {
    this._records = _.map(this._records, function(record) {
      return record._id == newRecord._id ? newRecord : record;
    });
    return this;
  }

});

module.exports = BaseStore;
