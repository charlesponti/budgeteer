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
var TaskStore = _.merge(BaseStore, {

  url: 'tasks',

  /**
   * Load tasks fro API
   */
  load: function() {
    service.get('tasks')
      .then(this.onLoadSuccess)
      .catch(function() {
        console.log(arguments);
      });
    return TaskStore;
  },

  /**
   * Handle load success
   * @param  {object} response
   */
  onLoadSuccess: function(response) {
    TaskStore._records = response.tasks;
    TaskStore.dispatch({
      action: TaskConstants.LOADED,
      data: TaskStore._records
    });
  },

  /**
   * Send API request to create new task
   * @param  {object} data
   * @param  {string} data.title
   * @param  {string} data.description
   */
  create: function(data) {
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
  },

  destroy: function(data) {
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
  },

  update: function(data) {
    service
      .put('tasks', data)
      .then(TaskStore.onUpdateResponse.bind(TaskStore));
  },

  /**
   * Handle success response from update requests
   */
  onUpdateResponse: function(response) {
    TaskStore.updateRecord(response.task);
    TaskStore.dispatch({
      action: TaskConstants.UPDATED,
      data: TaskStore._records
    });
  },

  /**
   * Handle events dispatched and received
   * @param  {object} payload
   * @return {boolean}
   */
  eventHandler: function(payload) {

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
      case TaskConstants.COMPLETED:
        TaskStore.completed(payload.data);
        break;
    }

    return true;
  }

});

/**
 * Register event handler
 */
TaskStore.register(TaskStore.eventHandler);

module.exports = TaskStore;
