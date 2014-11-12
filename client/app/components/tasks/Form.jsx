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
        _id: form._id.value,
        title: form.title.value,
        description: form.description.value,
        category: form.category.value
      }
    });
  },

  onSubmit: function(e, id) {
    e.preventDefault();

    // Determin if task should be created or updated based on presence of _id
    var fn = this.state.record._id.length ? 'updateTask' : 'createTask';
    
    // Call updateTask or createTask
    AppActions[fn](this.state.record);
  },

  /**
   * Render component
   */
  render: function() {
    var task = this.state.record;
    return (
      <form onSubmit={this.onSubmit} role="form">
        {this.makeField('hidden', '_id')}
        {this.makeFormGroup({ 
          type: 'input', 
          name: 'title', 
          label: 'Title', 
          changeFn: this.handleChange})}
        {this.makeFormGroup({ 
          type: 'textarea', 
          name: 'description', 
          label: 'Description', 
          changeFn: this.handleChange})}
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
