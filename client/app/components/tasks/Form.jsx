'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/App');
var FormMixin = require('../../mixins/Form.jsx');
var TaskStore = require('../../stores/TaskStore');
var CategorySelect = React.createFactory(require('../categories/Select.jsx'));

/**
 * TaskForm Component
 * @type {ReactComponent}
 */
var TaskForm = React.createClass({

  mixins: [FormMixin],

  recordName: 'Task',

  fields: [
    { type: 'hidden', name: '_id' },
    { type: 'input',  name: 'title' },
    { type: 'textarea', name: 'description' },
    { type: CategorySelect }
  ],

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return {
      record: this.props.task || { _id: '', title: '', description: '' },
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
        <input type="hidden" defaultValue={record._id} name="_id"/>
        <div className="form-group">
          <label htmlFor="title"> Title </label>
          <input name="title" className="form-control" defaultValue={record.title} />
        </div>
        <div className="form-group">
          <label htmlFor="description"> Description </label>
          <textarea name="description" className="form-control task-description">{record.description}</textarea>
        </div>
        <div className="form-group">
          <CategorySelect value={category || undefined} />
        </div>
        <button className="pull-right btn btn-success">
          {this.state.buttonText}
        </button>
      </form>
    );
  }

});

module.exports = TaskForm;
