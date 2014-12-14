'use strict';

var React = require('react');
var AppActions = require('../../actions/app');
var TaskForm = require('./Form.jsx');

var TaskAddButton = React.createClass({

  onClick: function() {
    AppActions.loadModal({
      title: 'Create Task',
      component: TaskForm({task: {}})
    });
  },

  render: function() {
    return (
      <button onClick={this.onClick} className="btn add btn-default">
      +
      </button>
    );
  }

});

module.exports = TaskAddButton;
