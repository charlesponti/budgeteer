'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');
var TaskStore = require('../../stores/TaskStore');
var CategorySelect = require('../category/Select.jsx');

/**
 * TaskForm Component
 * @type {ReactComponent}
 */
var TaskForm = React.createClass({

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    var task = this.props.task;

    if (task) {
      return {
        task: this.props.task,
        buttonText: 'Edit Task'
      };
    }

    return {
      task: {},
      buttonText: 'Create Task'
    };
  },

  onSubmit: function(e, id) {
    var form = this.getDOMNode();
    e.preventDefault();

    // Determine if task should be created or updated based on presence of _id
    var fn = this.state.record._id.length ? 'updateTask' : 'createTask';

    if (this.state._id) {
      return AppActions.updateTask(this.state.task);
    }

    return AppActions.createTask(this.state.task);
  },

  onChange: function() {
    var el = this.getDOMNode();
    var task = this.state.task;
    task.set('title', el.title.value);
    task.set('description', el.title.value);
    task.set('category', el.category.value);
  },

  /**
   * Render component
   */
  render: function() {
    var record = this.state.record;
    var category = record.category && record.category._id;

    return (
      <form onSubmit={this.onSubmit} role="form" onChange={this.onChange}>
        <input ref='_id' type="hidden" defaultValue={record._id} name="_id"/>
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input ref='title' name="title" className="form-control" defaultValue={record.title} />
        </div>
        <div className="form-group">
          <label htmlFor="description"> Description </label>
          <textarea ref='description' name="description"
            className="form-control task-description"
            defaultValue={record.description}></textarea>
        </div>
        <div className="form-group">
          <CategorySelect value={category || undefined} ref='category' />
        </div>
        <button className="pull-right btn btn-success">
          {this.state.buttonText}
        </button>
      </form>
    );
  }

});

module.exports = TaskForm;
