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
      categories: CategoryStore.models
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
    CategoryStore.on('add remove reset sort', this.onCategoryStoreChange);
    return CategoryStore.fetch();
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

        <h1>
          Categories
          <button onClick={this.onAddClick}
            className="btn btn-default pull-right">
            Add Category
          </button>
        </h1>

        <CategoryList categories={this.state.categories} />

      </div>
    );
  }

});

module.exports = CategoryMain;
