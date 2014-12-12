'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');
var FormMixin = require('../../mixins/Form.jsx');
var TaskStore = require('../../stores/TaskStore');
var CategorySelect = require('../categories/Select.jsx');

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
    return {
      record: {
        _id: task._id || '',
        title: task.title || '',
        description: task.description || ''
      },
      buttonText: this.props.task._id ? 'Edit Task' : 'Create Task'
    };
  },

  onSubmit: function(e, id) {
    var form = this.getDOMNode();
    e.preventDefault();

    // Determin if task should be created or updated based on presence of _id
    var fn = this.state.record._id.length ? 'updateTask' : 'createTask';

    // Call updateTask or createTask
    AppActions[fn]({
      _id: form._id.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value
    });
  },

  onChange: function() {
    var el = this.getDOMNode();
    this.setState({
      record: {
        _id: el._id.value,
        title: el.title.value,
        description: el.description.value,
        category: el.category.value
      }
    });
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
