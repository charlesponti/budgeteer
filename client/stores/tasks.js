'use strict';

// Module dependencies
var _ = require('lodash');
var Backbone = require('backbone');

// Application dependencies
var TaskModel = require('../models/task');
var App = require('../app');
var AppActions = App.actions;
var AppConstants = App.constants;
var AppDispatcher = App.dispatcher;

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: backbone
 * @requires module: ./models/task
 * @requires module: ../app-actions
 * @requires module: ../app-constants
 * @requires module: ../app-dispatcher
 */
var TaskStore = Backbone.Collection.extend({

  idAttribute: '_id',

  url: '/api/tasks',

  model: TaskModel,

  initialize: function() {
    this.add(App.initialData.tasks);
  },

  parse: function(response) {
    return response.data;
  },

  update: function(task) {
    return task.save();
  },

  destroy: function(task) {
    return task.destroy();
  }

});

TaskStore = new TaskStore();

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

// Register event handler
TaskStore.dispatchToken = AppDispatcher.register(TaskStore.dispatcherIndex);

module.exports = TaskStore;
