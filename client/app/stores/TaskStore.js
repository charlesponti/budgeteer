'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var BaseStore = require('./BaseStore');
var service = require('../service/api');
var TaskConstants = require('../constants/TaskConstants');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: ./BaseStore
 * @requires module: ../service/api
 * @requires module: ../constants/TaskConstants
 */
var TaskStore = BaseStore.extend();


TaskStore.url = 'tasks';

/**
 * Load tasks fro API
 */
TaskStore.load = function() {
  service.get('tasks')
    .then(this.onLoadSuccess)
    .catch(function() {
      console.log(arguments);
    });
  return TaskStore;
};

/**
 * Add new tasks and dispatch events
 * @param {object} response
 */
TaskStore.onLoadSuccess = function(response) {
  TaskStore.add(response.tasks);
  TaskStore.dispatch({
    action: TaskConstants.LOADED,
    data: TaskStore._records
  });
};

/**
 * Send API request to create new task
 * @param  {object} data Task to be created
 */
TaskStore.create = function(data) {
  service
    .post('tasks', data)
    .then(function(response) {
      TaskStore.add(response.task);
      TaskStore.dispatch({
        action: TaskConstants.CREATED,
        data: TaskStore._records
      });
    });
  return TaskStore;
};

/**
 * Send request to API to delete record
 * @param  {object} data Task to be updated
 */
TaskStore.destroy = function(data) {
  service
    .del('tasks', data)
    .then(function(response) {
      TaskStore.remove(response.task);
      TaskStore.dispatch({
        action: TaskConstants.UPDATED,
        data: TaskStore._records
      });
    });
  return TaskStore;
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
  TaskStore.dispatch({
    action: TaskConstants.UPDATED,
    data: TaskStore._records
  });
};

/**
 * Handle events dispatched and received
 * @param  {object} payload
 * @return {boolean}
 */
TaskStore.eventHandler = function(payload) {

  switch (payload.action) {
    case TaskConstants.CREATE:
      TaskStore.create(payload.data);
      break;
    case TaskConstants.UPDATE:
      TaskStore.update(payload.data);
      break;
    case TaskConstants.DESTROY:
      TaskStore.destroy(payload.data);
      break;
  }

  return true;
};

/**
 * Register event handler
 */
TaskStore.register(TaskStore.eventHandler);

module.exports = TaskStore;
