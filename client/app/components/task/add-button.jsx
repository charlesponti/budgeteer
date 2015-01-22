'use strict';

var React = require('react');
var AppActions = require('../../app-actions');
var TaskForm = require('./form.jsx');

var TaskAddButton = React.createClass({

  onClick: function() {
    AppActions.loadModal({
      title: 'Create Task',
      component: <TaskForm />
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
