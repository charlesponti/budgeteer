'use strict';

// Module dependencies
var _ = require('lodash');

// Application dependencies
var BaseStore = require('./BaseStore');
var service = require('../service/api');
var AppActions = require('../actions/app');
var AppConstants = require('../constants/App');
var AppDispatcher = require('../dispatchers/App');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../service/api
 * @requires module: ../constants/AppConstants
 */
var CategoryStore = BaseStore.extend();


CategoryStore.url = 'categories';

/**
 * Load tasks fro API
 */
CategoryStore.load = function() {
  service.get('categories')
    .then(this.onLoadSuccess)
    .catch(function() {
      
    });
  return CategoryStore;
};

/**
 * Add new categories and dispatch events
 * @param {object} response
 */
CategoryStore.onLoadSuccess = function(response) {
  CategoryStore._records = response.categories;
  CategoryStore.emitChange(CategoryStore._records);
};

/**
 * Send API request to create new task
 * @param  {object} data Task to be created
 */
CategoryStore.create = function(data) {
  service
    .post('categories', data)
    .then(CategoryStore.onCreateSuccess);
  return CategoryStore;
};

/**
 * Add tasks to store, emit change event, and close modal window
 */
CategoryStore.onCreateSuccess = function(response) {
  CategoryStore.add(response.category);
  CategoryStore.emitChange(CategoryStore._records);
};

/**
 * Send request to API to delete record
 * @param  {object} data Category to be updated
 */
CategoryStore.destroy = function(data) {
  service
    .del('categories', data)
    .then(CategoryStore.onDestorySuccess);
  return CategoryStore;
};

/**
 * Handle success response from deleting category
 */
CategoryStore.onDestorySuccess = function(response) {
  CategoryStore.remove(response.category);
  CategoryStore.emitChange(CategoryStore._records);
};

/**
 * Send request to API to update record
 * @param  {object} data Category to be updated
 */
CategoryStore.update = function(data) {
  service
    .put('categories', data)
    .then(CategoryStore.onUpdateSuccess)
    .catch(CategoryStore.onUpdateFail);
};

/**
 * Update record in CategoryStore._records
 * @param {object} response Response from API
 */
CategoryStore.onUpdateSuccess = function(response) {
  CategoryStore.updateRecord(response.category);
  CategoryStore.emitChange(CategoryStore._records);
};

/**
 * Handle events dispatched and received
 * @param  {object} payload
 * @return {boolean}
 */
CategoryStore.dispatcherIndex = function(payload) {

  switch (payload.action) {
    case AppConstants.CATEGORY_CREATE:
      CategoryStore.create(payload.data);
      break;
    case AppConstants.CATEGORY_UPDATE:
      CategoryStore.update(payload.data);
      break;
    case AppConstants.CATEGORY_DESTROY:
      CategoryStore.destroy(payload.data);
      break;
  }

  return true;
};

/**
 * Register event handler
 */
CategoryStore.dispatchToken = AppDispatcher.register(CategoryStore.dispatcherIndex);

module.exports = CategoryStore;
