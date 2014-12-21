'use strict';

// Module dependencies
var _ = require('lodash');
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/app');
var AppDispatcher = require('../../dispatchers/app');

// Components
var TaskListItem = require('./ListItem.jsx');
var TaskSearch = require('./search.jsx');

/**
 * TaskList component
 * @type {ReactElement}
 */
var TaskList = React.createClass({

  displayName: 'TaskList',

  propTypes: {
    tasks: React.PropTypes.array.isRequired
  },

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return {
      tasks: this.props.tasks
    };
  },

  /**
   * Handle update of component
   * @param {array} tasks Array of tasks
   */
  componentWillUpdate: function() {
    return this.setState({
      tasks: this.props.tasks
    });
  },

  /**
   * Set state to filtered tasks from TaskSearch
   * @param {array} tasks
   */
  onSearchChange: function(tasks) {
    return this.setState({ tasks: tasks });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    var sorted = this.state.tasks.sort(function(task) {
      return task.completed ? 1: -1;
    });

    return (
      <div>
        <TaskSearch className="task-search" callback={this.onSearchChange}/>
        <ul className="list-group">
          {_.map(sorted, function(task) {
            return (<TaskListItem task={task} key={task.get('_id')} />);
          })}
        </ul>
      </div>
    );
  }

});

module.exports = TaskList;
