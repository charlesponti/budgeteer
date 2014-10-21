'use strict';

var _ = require('lodash');
var React = require('react');
var TaskListItem = require('./ListItem.jsx');
var TaskStore = require('../../stores/TaskStore');

var TaskList = React.createClass({

  displayName: 'TaskList',

  render: function() {
    return (
      <ul className="list-group">
        {_.map(this.props.tasks, function(task) {
          return (<TaskListItem key={task._id} task={task} />);
        })}
      </ul>
    );
  }

});

module.exports = TaskList;
