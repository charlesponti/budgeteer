'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');
var TaskStore = require('../../stores/tasks');
var TaskModel = require('../../models/task');
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
    if (this.props.task) {
      return {
        task: this.props.task,
        buttonText: 'Edit Task'
      };
    }

    return {
      task: new TaskModel({ _id: '', title: '', description: '' }),
      buttonText: 'Create Task'
    };
  },

  onSubmit: function(e, id) {
    var form = this.getDOMNode();
    e.preventDefault();

    if (this.state.task.isNew) {
      return AppActions.createTask(this.state.task);
    }

    return AppActions.updateTask(this.state.task);
  },

  onChange: function() {
    var el = this.getDOMNode();
    var task = this.state.task;
    task.set('_id', el._id.value);
    task.set('title', el.title.value);
    task.set('description', el.description.value);
    task.set('category', el.category.value);
  },

  /**
   * Render component
   */
  render: function() {
    var task = this.state.task;
    var category = task.get('category') && task.get('category')._id;

    return (
      <form onSubmit={this.onSubmit} role="form" onChange={this.onChange}>
        <input ref='_id' type="hidden" defaultValue={task.get('_id')} name="_id"/>
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input ref='title' name="title" className="form-control" defaultValue={task.get('title')} />
        </div>
        <div className="form-group">
          <label htmlFor="description"> Description </label>
          <textarea ref='description' name="description"
            className="form-control task-description"
            defaultValue={task.get('description')}></textarea>
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
