'use strict';

var _ = require('lodash');
var Dispatcher = require('flux').Dispatcher;

/**
 * Create BaseStore
 * @type {Dispatcher}
 */
var BaseStore = new Dispatcher();

BaseStore.url = undefined;

BaseStore._records = [];

/**
 * Return store's records
 * @return {array}
 */
BaseStore.getRecords = function() {
  return this._records || [];
};

/**
 * Add record
 * @param {*} records
 */
BaseStore.add = function(records) {
  if (_.isArray(records)) {
    var areObjects = _.every(records, function(record) { 
      return _.isPlainObject(record);
    });
    // Only add 
    if (areObjects) {
      this._records.concat(records);  
    } else {
      throw new Error('BaseStore#add only takes an object or an array of objects');
    }
  } else if (_.isPlainObject(records)) {
    this._records.push(records);  
  } else {
    throw new Error('BaseStore#add only takes an object or an array of objects');
  }

  return this._records;
};

/**
 * Remove record
 * @param  {string} id
 */
BaseStore.remove = function(id) {
  this._records = _.reject(this._records, function(task) {
    return task._id == id;
  });
  return this;
};

/**
 * Update record
 * @param {object} newRecord
 */
BaseStore.updateRecord = function(newRecord) {
  this._records = _.map(this._records, function(record) {
    return record._id == newRecord._id ? newRecord : record;
  });
  return this;
};

module.exports = BaseStore;
