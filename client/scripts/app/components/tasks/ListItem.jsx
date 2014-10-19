'use strict';

var React = require('react');

var TaskListItem = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired
  },

  render: function() {
    var task = this.props.task;

    return (
      <li className="list-group-item">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </li>
    )
  }

});

module.exports = TaskListItem;
