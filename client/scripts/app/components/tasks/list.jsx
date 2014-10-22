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
      case TaskConstants.CREATED:
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
   * Filter tasks by search term
   * @param  {SyntheticEvent} e 
   * @param  {string} id
   */
  onSearchFieldChange: function(e, id) {
    var searchTerm = e.target.value;
    var records = TaskStore.getRecords();
    if (searchTerm.length) {
      var regExp = new RegExp(searchTerm, 'i');
      this.setState({
        tasks: records.filter(function(task) { 
          return regExp.test(task.title);
        })
      });
    } else {
      this.setState({ tasks: records });
    }
  },

  /**
   * Render component
   * @return {ReactCompositeComponent}
   */
  render: function() {
    return (
      <div>
        <form role="form" className="task-search">
          <input className="form-control"
            onChange={this.onSearchFieldChange} placeholder="Search" />
        </form>
        <ul className="list-group">
          {_.map(this.state.tasks, function(task) {
            return (<TaskListItem key={task._id} task={task} />);
          })}
        </ul>
      </div>
    );
  }

});

module.exports = TaskList;
