'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');
var CategoryStore = require('../../stores/categories');

// Components
var CategoryForm = require('./Form.jsx');
var CategoryList = require('./List.jsx');

/**
 * Main view for the Tasks application
 * @type {ReactElement}
 */
var CategoryMain = React.createClass({

  displayName: 'CategoryMain',

  getInitialState: function() {
    return {
      categories: this.props.categories || []
    };
  },

  onCategoryStoreChange: function() {
    if (this.isMounted()) {
      return this.setState({
        categories: CategoryStore.models
      });
    }
  },

  /**
   * Perform actions when component will get mounted to the DOM
   */
  componentWillMount: function() {
    CategoryStore.on('set reset sync', this.onCategoryStoreChange);
    if (!this.state.categories.length) {
      return CategoryStore.fetch();
    }
  },

  onAddClick: function() {
    return AppActions.loadModal({
      title: 'Create Category',
      component: <CategoryForm />
    });
  },

  /**
   * Render view
   */
  render: function() {
    return (
      <div className="row">
        <CategoryList categories={this.state.categories} />
        <button onClick={this.onAddClick}
          className="btn btn-default pull-right">
          Add Category
        </button>
      </div>
    );
  }

});

module.exports = CategoryMain;
