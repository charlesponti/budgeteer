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
      buttonText: this.props.record ? 'Edit Task' : 'Create Task'
    };
  },

  /**
   * Handle change to form fields
   * @param  {SyntheticEvent} e
   * @param  {String} id
   */
  handleChange: function(e, id) {
    var form = this.getDOMNode();
    this.setState({
      record: {
        _id: form.id.value,
        title: form.title.value,
        description: form.description.value,
        category: form.category.value._id || 'default'
      }
    });
  },

  onSubmit: function(e, id) {
    e.preventDefault();

    if (this.state.record._id.length) {
      AppActions.updateTask(this.state.task);
    } else {
      AppActions.createTask(this.state.task);
    }

    AppActions.navigate('tasks');
  },

  /**
   * Render component
   */
  render: function() {
    var task = this.state.record;
    return (
      <form onSubmit={this.onSubmit} role="form">
        <input type="hidden" name="id" value={task._id} />
        {this.makeFormGroup('title', 'Title', this.handleChange)}
        <div className="form-group">
          <label htmlFor="title"> Description </label>
          <textarea className="form-control"
            name="description"
            onChange={this.handleChange}
            value={task.description} />
        </div>
        <div className="form-group">
          <CategorySelect onChange={this.handleChange}/>
        </div>
        <button className="pull-right btn btn-success">
          {this.state.buttonText}
        </button>
      </form>
    )
  }

});

module.exports = TaskForm;
