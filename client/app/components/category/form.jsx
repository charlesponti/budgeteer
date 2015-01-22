'use strict';

// Module dependencies
var React = require('react');

var AppActions = require('../../actions/app');

var CategoryForm = React.createClass({

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
   * Set state of component when form inputs are changed
   * @param  {SyntheticEvent} e
   * @param  {string} id
   */
  onChange: function(e, id) {
    var form = this.getDOMNode();
    this.setState({
      record: {
        name: form.name.value,
        color: form.color.value
      }
    });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    var category = this.state.record;
    return (
      <form role="form" onSubmit={this.onSubmit} onChange={this.onChange}>
        <input type="hidden" name="_id" value={category._id}/>
          <div class="form-group">
            <label for="name">Name</label>
            <input className="form-control" name="name" defaultValue={category.name} />
          </div>
          <div class="form-group">
            <label for="color">Color</label>
            <input className="form-control" name="color" />
          </div>
          <br/>
          <button className="btn btn-success">
            {this.state.buttonText}
          </button>
      </form>
    );
  }

});

module.exports = CategoryForm;
