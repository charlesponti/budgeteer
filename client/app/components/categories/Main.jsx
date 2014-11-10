'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var AppActions = require('../../actions/App');
var CategoryStore = require('../../stores/CategoryStore');

// Components
var CategoryForm = React.createFactory(require('./Form.jsx'));
var CategoryList = React.createFactory(require('./List.jsx'));

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

        <h1 className="col-xs-12 col-md-10 col-md-offset-1 text-center"> 
          Categories
          <button onClick={this.onAddClick} 
            className="btn btn-default pull-right">
            Add Category
          </button>
        </h1>

        <div className="col-xs-12 col-md-10 col-md-offset-1 task-list">
          <CategoryList id='task-list' />
        </div>

      </div>
    );
  }

});

module.exports = CategoryMain;
