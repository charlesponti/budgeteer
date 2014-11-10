'use strict';

// Module dependencies
var React = require('react');

var FormMixin = require('../../mixins/Form.jsx');
var AppActions = require('../../actions/App');

var CategoryForm = React.createClass({

  mixins: [FormMixin],

  displayName: 'CategoryForm',

  getInitialState: function() {
    return {
      record: this.props.category || { _id: undefined, name: undefined, color: undefined },
      buttonText: this.props.category ? 'Update Category' : 'Create Category'
    };
  },

  /**
   * Handle submit form
   * @param  {SyntheticEvent} e
   * @param  {string} id
   */
  onSubmit: function(e, id) {
    e.preventDefault();
    if (this.state.record._id) {
      AppActions.updateCategory(this.state.record);
    } else {
      AppActions.createCategory(this.state.record);
    }
  },
  
  /**
   * Handle change event
   * @param  {SyntheticEvent} e
   * @param  {string} id
   */
  handleChange: function(e, id) {
    var form = this.getDOMNode();
    this.setState({
      record: {
        name: form.name.value,
        color: form.color.value
      }
    });
  },

  render: function() {
    var category = this.state.record;
    
    return (
      <form role="form" onSubmit={this.onSubmit}>
        <input type="hidden" name="_id" value={category._id}/>
        {this.makeFormGroup('name', 'Name', this.handleChange)}
        {this.makeFormGroup('color', 'Color', this.handleChange)}
        <button className="btn btn-success">{this.state.buttonText}</button>
      </form>
    )
  }

});

module.exports = CategoryForm;
