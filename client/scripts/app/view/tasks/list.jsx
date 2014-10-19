/** @jsx React.DOM */

'use strict';

var TaskStore = require('../../stores/tasks-store');

var TaskList = React.createClass({

  displayName: 'TaskList',

  getInitialState: function() {
    var self = this;
    return { tasks: TaskStore.getRecords() }
  },

  render: function() {
    var todos = TaskStore.getRecords();
    return <ul className="list-group">{todos}</ul>;
  }

});

module.exports = TaskList;
