'use strict';

/**
 * Module dependencies
 * @requires module: BaseStore
 * @requires module: TaskDispatcher
 */
var BaseStore = require('./base-store');
var TaskConstants = require('../constants/TaskConstants');
var TaskDispatcher = require('../dispatchers/TaskDispatcher');

/**
 * Store which will hold tasks
 * @requires module: BaseStore
 * @requires module: TaskConstants
 * @requires module: TaskDispatcher
 */
var TaskStore = BaseStore.new({

  url: 'tasks',

  add: function(task) {
    this._records.push(task);
    return this._records;
  },

  /**
   * Send API request to create new task
   * @param  {object} data
   * @param  {string} data.title
   * @param  {string} data.description
   */
  create: function(data) {
    App.API
      .post('/api/tasks', {
        title: data.title,
        description: data.description
      })
      .end(function(err, response) {
        
        err = err || response.error;
        if (err) {
          return console.log(err);
        }
        TaskStore.add(response.body.task);
        TaskStore.emit('loaded');
      });
  },

  /**
   * Register dispatcher
   */
  dispatcherIndex: TaskDispatcher.register(function(payload) {

    switch (payload.action) {
      case TaskConstants.CREATE:
        TaskStore.create(payload.data)
        break;
      case TaskConstants.UPDATE:
        TaskStore.update(payload.data)
        break;
      case TaskConstants.DESTROY:
        TaskStore.destroy(payload.data)
        break;
    }

    return true;
  })

});

module.exports = TaskStore;
