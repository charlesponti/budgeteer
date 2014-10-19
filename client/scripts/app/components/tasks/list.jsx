'use strict';

var _ = require('lodash');
var React = require('react');
var TaskListItem = require('./ListItem.jsx');
var TaskStore = require('../../stores/TaskStore');

var TaskList = React.createClass({

  displayName: 'TaskList',

  getInitialState: function() {
    var self = this;
    TaskStore.on('loaded', function() {
      self.setState({ tasks: TaskStore.getRecords() });
    });
    return { tasks: TaskStore.getRecords() };
  },

  render: function() {
    var tasks = _.map(this.state.tasks, function(task) {
      return (<TaskListItem key={task._id} task={task} />);
    });
    return (<ul className="list-group">{tasks}</ul>);
  }

});

module.exports = TaskList;
