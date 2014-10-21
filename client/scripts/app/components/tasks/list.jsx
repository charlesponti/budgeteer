'use strict';

var _ = require('lodash');
var React = require('react');

var TaskListItem = require('./ListItem.jsx');
var TaskStore = require('../../stores/TaskStore');
var TaskConstants = require('../../constants/TaskConstants');
var TaskDispatcher = require('../../dispatchers/TaskDispatcher');

/**
 * TaskList component
 * @type {ReactCompositeComponent}
 */
var TaskList = React.createClass({

  displayName: 'TaskList',

  getInitialState: function() {
    return { tasks: this.props.tasks };
  },

  dispatcher: function(payload) {
    switch(payload.action) {
      case TaskConstants.LOADED:
        this.setState({ tasks: payload.data });
        break;
      case TaskConstants.UPDATED:
        this.setState({ tasks: payload.data });
        break;
    }
  },

  /**
   * Handle logic when component will be mounted to the DOM
   */
  componentWillMount: function() {
    TaskDispatcher.register(this.dispatcher);
  },

  /**
   * Render component
   * @return {ReactCompositeComponent}
   */
  render: function() {
    return (
      <ul className="list-group">
        {_.map(this.state.tasks, function(task) {
          return (<TaskListItem key={task._id} task={task} />);
        })}
      </ul>
    );
  }

});

module.exports = TaskList;
