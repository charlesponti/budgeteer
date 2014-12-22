'use strict';

// Module dependencies
var _ = require('lodash');
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/app');
var AppDispatcher = require('../../dispatchers/app');
var CategoryStore = require('../../stores/categories');

// Components
var ListItem = require('./ListItem.jsx');

/**
 * TaskList component
 * @type {ReactElement}
 */
var CategoryList = React.createClass({

  displayName: 'CategoryList',

  propTyps: {
    categories: React.PropTypes.array.isRequired
  },

  /**
   * Handle logic when component will be mounted to the DOM
   */
  componentWillMount: function() {
    return this.setState({
      categories: this.props.categories
    });
  },

  /**
   * Handle logic when component will be unmounted from the DOM
   */
  componentWillReceiveProps: function() {
    return this.setState({
      categories: this.props.categories
    });
  },

  /**
   * Filter tasks by search term
   * @param  {SyntheticEvent} e
   * @param  {string} id
   */
  onSearchFieldChange: function(e, id) {
    var searchTerm = e.target.value;
    var categories = CategoryStore.models;

    if (searchTerm.length) {
      searchTerm = searchTerm.replace(' ', '');
      var regExp = new RegExp(searchTerm, 'i');
      categories = categories.filter(function(record) {
        return regExp.test(record.name);
      });
    }

    this.setState({ categories: categories });
  },

  /**
   * Render component
   * @return {ReactCompositeComponent}
   */
  render: function() {
    return (
      <div>
        <form role="form" className="task-search">
          <input className="form-control"
            onChange={this.onSearchFieldChange} placeholder="Search" />
        </form>
        <ul className="list-group">
          {this.state.categories.map(function(category) {
            return <ListItem category={category} />;
          })}
        </ul>
      </div>
    );
  }

});

module.exports = CategoryList;
