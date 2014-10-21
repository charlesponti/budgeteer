/** @jsx React.DOM */

'use strict';

var React = require('react');
var TaskForm = require('./Form.jsx');
var TaskList = require('./List.jsx');
var TaskStore = require('../../stores/TaskStore');

/**
 * Main view for the Tasks application
 */
var TaskApp = React.createClass({

  displayName: 'TaskApp',

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return { tasks: null };
  },

  /**
   * Handle `loaded` event of TaskStore
   * @param {array} tasks
   */
  onTaskStoreLoaded: function(tasks) {
    if (this.isMounted()) {
      this.setState({ tasks: tasks });
    }
  },

  /**
   * Perform actions when componet will get mounted to the DOM
   */
  componentDidMount: function() {
    TaskStore.load().on('loaded', this.onTaskStoreLoaded.bind(this));
  },

  /**
   * Render view
   */
  render: function() {
    return (
      <div className="row">

        <h1 className="text-center"> Tasks </h1>

        <div className="col-sm-6" >
          <TaskList id='task-list' tasks={this.state.tasks}/>
        </div>

        <div className="col-sm-6" >
          <TaskForm id='task-form' />
        </div>

      </div>
    );
  }

});

module.exports = TaskApp;
