'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var $ = require('jquery');
var App = require('../app.jsx');
var BaseStore = require('./BaseStore');
var request = require('superagent/superagent');
var TaskConstants = require('../constants/TaskConstants');
var TaskDispatcher = require('../dispatchers/TaskDispatcher');

/**
 * Store which will hold tasks
 * @requires module: lodash
 * @requires module: superagent/superagent
 * @requires module: ./BaseStore
 * @requires module: ../constants/TaskConstants
 * @requires module: ../dispatchers/TaskDispatcher
 */
var TaskStore = BaseStore.new({

  url: 'tasks',

  add: function(task) {
    if (_.isArray(this._records)) {
      this._records.push(task);
    }

    return this._records;
  },

  remove: function(id) {
    this._records = _.reject(this._records, function(task) {
      return task._id == id;
    });
  },

  /**
   * Load tasks fro API
   */
  load: function() {
    $.get('/api/tasks')
      .then(function(response) {
        this._records = response.tasks;
        TaskDispatcher.dispatch({
          action: TaskConstants.LOADED,
          data: this._records
        });
      }.bind(this))
      .fail(function(err) {
        throw err;
      });
    return this;
  },

  /**
   * Send API request to create new task
   * @param  {object} data
   * @param  {string} data.title
   * @param  {string} data.description
   */
  create: function(data) {
    request
      .post('/api/tasks')
      .type('form')
      .send({
        title: data.title,
        description: data.description,
        _csrf: App.getCSRF()
      })
      .end(function(err, response) {
        if (err) {
          throw err;
        } else {
          this._records.push(response.body.task);
          TaskDispatcher.dispatch({
            action: TaskConstants.CREATED,
            data: this._records
          });
        }
      }.bind(this));
    return this;
  },

  destroy: function(data) {
    request
      .del('/api/tasks')
      .send({
        id: data._id, _csrf: App.getCSRF()
      })
      .end(function(err, response) {
        if (err) {
          throw err;
        } else {
          this.remove(response.body.task);
          TaskDispatcher.dispatch({
            action: TaskConstants.UPDATED,
            data: this._records
          });
        }
      }.bind(this));
    return this;
  },

  update: function(data) {
    request
      .put('/api/tasks')
      .type('form')
      .send({
        id: data._id,
        title: data.title,
        description: data.description,
        _csrf: App.getCSRF()
      })
      .end(function(err, response) {
        if (err) {
          throw err;
        } else {
          var task = response.body.task;
          this._records = _.map(this._records, function(record) {
            return record._id == task._id ? task : record;
          });
          TaskDispatcher.dispatch({
            action: TaskConstants.UPDATED,
            data: this._records
          });
        }
      }.bind(this));
  },

  /**
   * Register dispatcher
   */
  dispatcherIndex: TaskDispatcher.register(function(payload) {

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
  })

});

module.exports = TaskStore;
