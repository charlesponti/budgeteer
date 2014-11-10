'use strict';

// Module dependencies
var _ = require('lodash');
var React = require('react');

// Application dependencies
var AppConstants = require('../../constants/App');
var AppDispatcher = require('../../dispatchers/App');
var CategoryStore = require('../../stores/CategoryStore');

// Components
var ListItem = React.createFactory(require('./ListItem.jsx'));

/**
 * TaskList component
 * @type {ReactElement}
 */
var CategoryList = React.createClass({

  displayName: 'CategoryList',

  /**
   * Get initial state of component
   * @return {object}
   */
  getInitialState: function() {
    return { records: [] };
  },

  /**
   * Handle change of store
   * @param {array} records Array of records
   */
  onCategoryStoreChange: function(records) {
    if (this.isMounted()) {
      this.setState({ records: records });
    }
  },

  /**
   * Handle logic when component will be mounted to the DOM
   */
  componentWillMount: function() {
    CategoryStore.addChangeListener(this.onCategoryStoreChange);
  },

  /**
   * Handle logic when component will be unmounted from the DOM
   */
  componentWillUnmount: function() {
    CategoryStore.removeChangeListener(this.onCategoryStoreChange);
  },

  /**
   * Filter tasks by search term
   * @param  {SyntheticEvent} e 
   * @param  {string} id
   */
  onSearchFieldChange: function(e, id) {
    var searchTerm = e.target.value;
    var records = CategoryStore.getRecords();

    if (searchTerm.length) {
      searchTerm = searchTerm.replace(' ', '');
      var regExp = new RegExp(searchTerm, 'i');
      records = records.filter(function(record) { 
        return regExp.test(record.name);
      });
    }

    this.setState({ records: records });
  },

  /**
   * Render component
   * @return {ReactCompositeComponent}
   */
  render: function() {
    return (
      <div>
        <form role="form" className="task-search">
          <input className="form-control task-search"
            onChange={this.onSearchFieldChange} placeholder="Search" />
        </form>
        <ul className="list-group">
          {this.state.records.map(function(record) {
            return (<ListItem record={record} />);
          })}
        </ul>
      </div>
    );
  }

});

module.exports = CategoryList;
