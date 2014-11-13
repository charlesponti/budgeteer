'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var CategoryStore = require('../../stores/CategoryStore');

/**
 * Category select form element
 * @type {ReactComponent}
 */
var CategorySelect = React.createClass({

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return {
      value: this.props.value || '',
      records: CategoryStore.getRecords()
    };
  },

  /**
   * Handle change event of select box
   */
  onCategoryStoreChange: function() {
    this.setState({ records: CategoryStore.getRecords() });
  },

  /**
   * Perform logic when component will be mounted
   */
  componentWillMount: function() {
    CategoryStore.addChangeListener(this.onCategoryStoreChange);

    // If componenet has no records, load store
    if (!this.state.records.length) {
      CategoryStore.load();
    }
  },

  /**
   * Perform logic when component will be unmounted
   */
  componentWillUnmount: function() {
    CategoryStore.removeChangeListener(this.onCategoryStoreChange);
  },

  /**
   * Handle change of field
   * @param {SyntheticEvent} e
   * @param {string} id
   */
  onChange: function(e, id) {
    this.setState({ value: e.target.value });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    return (
      <select name="category" onChange={this.onChange} className="form-control" value={this.state.value}>
        <option> Select Category... </option>
        {this.state.records.map(function(category) {
          return <option value={category._id}>{category.name}</option>
        })};
      </select>
    );
  }

});

module.exports = CategorySelect;
