'use strict';

// Module dependencies
var _ = require('lodash');

// Application dependencies
var BaseStore = require('./BaseStore');
var service = require('../service/api');
var AppActions = require('../actions/App');
var AppConstants = require('../constants/App');
var AppDispatcher = require('../dispatchers/App');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../service/api
 * @requires module: ../constants/AppConstants
 */
var TaskStore = BaseStore.extend();

TaskStore.url = 'tasks';

/**
 * Load tasks fro API
 */
TaskStore.load = function() {
  service
    .get('tasks')
    .then(this.onLoadSuccess)
    .catch(this.onLoadFailure);
  return TaskStore;
};

/**
 * Add new tasks and dispatch events
 * @param {object} response
 */
TaskStore.onLoadSuccess = function(response) {
  TaskStore._records = response.tasks;
  TaskStore.emitChange(TaskStore._records);
};

/**
 * Handle load failure
 */
TaskStore.onLoadFailure = function() {
  console.log(arguments);
};

/**
 * Send API request to create new task
 * @param  {object} data Task to be created
 */
TaskStore.create = function(data) {
  service
    .post('tasks', data)
    .then(TaskStore.onCreateSuccess);
  return TaskStore;
};

/**
 * Add tasks to store, emit change event, and close modal window
 */
TaskStore.onCreateSuccess = function(response) {
  TaskStore.add(response.task);
  TaskStore.emitChange(TaskStore._records);
};

/**
 * Send request to API to delete record
 * @param  {object} data Task to be updated
 */
TaskStore.destroy = function(data) {
  service
    .del('tasks', data)
    .then(TaskStore.onDestorySuccess);
  return TaskStore;
};

/**
 * Handle success response from deleting task
 */
TaskStore.onDestorySuccess = function(response) {
  TaskStore.remove(response.task);
  TaskStore.emitChange(TaskStore._records);
};

/**
 * Send request to API to update record
 * @param  {object} data Task to be updated
 */
TaskStore.update = function(data) {
  service
    .put('tasks', data)
    .then(TaskStore.onUpdateSuccess)
    .catch(TaskStore.onUpdateFail);
};

/**
 * Update record in TaskStore._records
 * @param {object} response Response from API
 */
TaskStore.onUpdateSuccess = function(response) {
  TaskStore.updateRecord(response.task);
  TaskStore.emitChange(TaskStore._records);
};

/**
 * Handle events dispatched and received
 * @param  {object} payload
 * @return {boolean}
 */
TaskStore.dispatcherIndex = function(payload) {

  switch (payload.action) {
    case AppConstants.TASK_CREATE:
      TaskStore.create(payload.data);
      break;
    case AppConstants.TASK_UPDATE:
      TaskStore.update(payload.data);
      break;
    case AppConstants.TASK_DESTROY:
      TaskStore.destroy(payload.data);
      break;
  }

  return true;
};

/**
 * Register event handler
 */
TaskStore.dispatchToken = AppDispatcher.register(TaskStore.dispatcherIndex);

module.exports = TaskStore;
