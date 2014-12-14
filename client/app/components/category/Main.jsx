'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/app');
var CategoryStore = require('../../stores/CategoryStore');

// Components
var CategoryForm = require('./Form.jsx');
var CategoryList = require('./List.jsx');

/**
 * Main view for the Tasks application
 * @type {ReactElement}
 */
var CategoryMain = React.createClass({

  displayName: 'CategoryMain',

  /**
   * Perform actions when component will get mounted to the DOM
   */
  componentWillMount: function() {
    CategoryStore.load();
  },

  onAddClick: function() {
    AppActions.loadModal({
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

        <CategoryList className="task-list" id='task-list' />

      </div>
    );
  }

});

module.exports = CategoryMain;
