/** @jsx React.DOM */

'use strict';

var _ = require('lodash');
var TaskListItem = require('./ListItem.jsx');
var TaskStore = require('../../stores/TaskStore');

var TaskList = React.createClass({

  displayName: 'TaskList',

  getInitialState: function() {
    var self = this;
    TaskStore.on('loaded', function(data) {
      self.setState({ tasks: data.tasks });
    });
    return { tasks: TaskStore.getRecords() }
  },

  render: function() {
    var tasks = _.map(this.state.tasks, function(task) {
      return (<TaskListItem key={task._id} task={task} />)
    });
    return (<ul className="list-group">{tasks}</ul>);
  }

});

module.exports = TaskList;
