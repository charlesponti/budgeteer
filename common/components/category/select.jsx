'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var CategoryStore = require('_/client/js/stores/categories');

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
      records: CategoryStore.models
    };
  },

  /**
   * Handle change event of select box
   */
  onCategoryStoreChange: function() {
    return this.setState({
      records: CategoryStore.models
    });
  },

  /**
   * Perform logic when component will be mounted
   */
  componentWillMount: function() {
    CategoryStore.on('add remove sync', this.onCategoryStoreChange);
    return CategoryStore.fetch();
  },

  /**
   * Handle change of field
   * @param {SyntheticEvent} e
   * @param {string} id
   */
  onChange: function(e, id) {
    return this.setState({
      value: e.target.value
    });
  },

  /**
   * Render component
   * @return {ReactElement}
   */
  render: function() {
    return (
      <select name="category" onChange={this.onChange}
        className="form-control" value={this.state.value}>
        <option> Select Category... </option>
        {this.state.records.map(function(category) {
          return (
            <option value={category.get('_id')}>
              {category.get('name')}
            </option>
          );
        })};
      </select>
    );
  }

});

module.exports = CategorySelect;
