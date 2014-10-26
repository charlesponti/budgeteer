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
 * Create an extension of BaseStore
 * @param  {object} newStore
 * @return {object}
 */
BaseStore.new = function(newStore) {
  newStore = _.merge(new Dispatcher(), newStore, this);
  
  // If new store has a init method, call it before returning new store
  if (_.isFunction(newStore.init)) {
    newStore.init();
  }

  return newStore;
};

/**
 * Return store's records
 * @return {array}
 */
BaseStore.getRecords = function() {
  return this._records || [];
};

/**
 * Add record
 * @param {object} record
 */
BaseStore.add = function(record) {
  if (_.isArray(this._records)) {
    this._records.push(record);
  } else {
    this._records = [record];
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
