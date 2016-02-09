import _ from 'lodash';
import { EventEmitter } from 'events';
import Dispatcher from './app/dispatcher';

const Store = _.extend({

  getRecords() {
    let localRecords = JSON.parse(localStorage.getItem(this.storeName)) || [];

    // Precautionary measure if localRecords ever becomes something
    // other than an array.
    if (!_.isArray(localRecords)) {
      localRecords = [];
    }

    if (!_.isFunction(this.Model)) {
      console.warn('store has no model');
    }

    return localRecords.map(record => new this.Model(record));
  },

  setRecords(value) {
    localStorage.setItem(this.storeName, JSON.stringify(value));
    return this.emitChange();
  },

  add(record) {
    return new Promise((resolve, reject) => {
      let records = this.getRecords();
      if (record.id >= 0) {
        this.remove(record).then(() => {
          // Get records with edited record removed
          records = this.getRecords();
          // Add record to records array
          records.push(new this.Model(record));
          // Sort records by id
          records = _.sortBy(records, 'id');
          // Set records
          this.setRecords(records);
          // Resolve promise
          resolve(records);
        });
      } else {
        // Add id to record
        record.id = records.length;
        // Add new record to records array
        records.push(new this.Model(record));
        // Sort records by id
        records = _.sortBy(records, 'id');
        // Set records to store
        this.setRecords(records);
        // Resolve promise
        resolve(records);
      }
    });
  },

  remove(recordToDelete) {
    return new Promise((resolve, reject) => {
      resolve(this.setRecords(this.getRecords().filter((record) => {
        return record.id != recordToDelete.id;
      })));
    });
  },

  find(id) {
    return _.findWhere(this.getRecords(), {id});
  },

  /**
   * @param {function} listener - Function to call from when change event
   * occurs
   */
  addChangeListener(listener) {
    return this.addListener('change', listener);
  },

  /**
   * @param {function} listener - Function to remove from when change event
   * occurs
   */
  removeChangeListener(listener) {
    return this.removeListener('change', listener);
  },

  emitChange() {
    return this.emit('change');
  },

  validate() {
    return { error: null };
  }

}, EventEmitter.prototype);

Dispatcher.register((payload) => {
  switch (payload.action) {
    case 'transaction.add':
      Store.add(payload.data);
      Store.emitChange();
      break;
    case 'transaction.remove':
      Store.remove(payload.data);
      Store.emitChange();
      break;
    default:
      return;
  }
});

export default Store;
