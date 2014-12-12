'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/App');
var TaskStore = require('../../stores/TaskStore');

// Components
var TaskForm = React.createFactory(require('./Form.jsx'));
var TaskList = React.createFactory(require('./List.jsx'));

/**
 * Main view for the Tasks application
 * @type {ReactElement}
 */
var TaskMain = React.createClass({

  displayName: 'TaskMain',

  /**
   * Perform actions when component will get mounted to the DOM
   */
  componentWillMount: function() {
    TaskStore.load();
  },

  onAddClick: function() {
    AppActions.loadModal({
      title: 'Create Task',
      component: TaskForm({task: {}})
    });
  },

  /**
   * Render view
   */
  render: function() {
    return (
      <div className="row">
        <h1>
          Tasks
          <button onClick={this.onAddClick}
            className="btn btn-default pull-right">
            Add Task
          </button>
        </h1>
        <TaskList className="task-list" id='task-list' />
      </div>
    );
  }

});

module.exports = TaskMain;
