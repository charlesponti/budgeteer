'use strict';

// Module dependencies
var _ = require('lodash');
var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

/**
 * Create BaseStore
 * @type {Dispatcher}
 */
var BaseStore = merge(EventEmitter.prototype, {

  url: undefined,

  _records: [],

  /**
   * Return store's records
   * @return {array}
   */
  getRecords: function() {
    return this._records;
  },

  /**
   * Add record
   * @param {*} records
   */
  add: function(records) {
    if (_.isArray(records)) {
      var areObjects = _.every(records, function(record) { 
        return _.isPlainObject(record);
      });

      // Only add if all values in array are objects, throw error if not
      if (areObjects) {
        this._records = this._records.concat(records);
        return this._records;
      } 
    } else if (_.isPlainObject(records)) {
      // Add record to store
      this._records.push(records);
      return this._records;
    } 
    
    throw new Error('BaseStore#add only takes an object or an array of objects');
  },

  /**
   * Remove record
   * @param  {string} id
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
  },

  /**
   * Create a new store extended from BaseStore
   * @param  {object} config
   * @return {object}
   */
  extend: function(config) {
    var newStore = new Dispatcher();
    _.extend(newStore, config || {});
    _.extend(newStore, BaseStore);
    return newStore;
  }

});

module.exports = BaseStore;
