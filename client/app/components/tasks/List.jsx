'use strict';

// Module dependencies
var _ = require('lodash');
var React = require('react');

// Application dependencies
var TaskStore = require('../../stores/TaskStore');
var AppConstants = require('../../constants/App');
var AppDispatcher = require('../../dispatchers/App');

// Components
var TaskListItem = require('./ListItem.jsx');
var TaskSearch = require('./search.jsx');

/**
 * TaskList component
 * @type {ReactElement}
 */
var TaskList = React.createClass({

  displayName: 'TaskList',

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return { tasks: undefined };
  },

  /**
   * Handle change of TaskStore
   * @param {array} tasks Array of tasks
   */
  onTaskStoreChange: function(tasks) {
    if (this.isMounted()) {
      this.setState({ tasks: tasks });
    }
  },

  /**
   * Handle logic when component will be mounted to the DOM
   */
  componentWillMount: function() {
    TaskStore.addChangeListener(this.onTaskStoreChange);
  },

  /**
   * Handle logic when component will be unmounted from the DOM
   */
  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this.onTaskStoreChange);
  },

  /**
   * Set state to filtered tasks from TaskSearch
   * @param {array} tasks
   */
  onSearchChange: function(tasks) {
    this.setState({ tasks: tasks });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    var sorted = (this.state.tasks || []).sort(function(task) {
      return task.completed ? 1: -1;
    });
    return (
      <div>
        <TaskSearch className="task-search" callback={this.onSearchChange}/>
        <ul className="list-group">
          {_.map(sorted, function(task) {
            return (<TaskListItem task={task} key={task._id} />);
          })}
        </ul>
      </div>
    );
  }

});

module.exports = TaskList;
