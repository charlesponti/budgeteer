'use strict';

// Module dependencies
var React = require('react');

/**
 * Task Component
 * @type {ReactElement}
 */
var ListItem = React.createClass({

  displayName: 'CategoryListItem',

  propTypes: {
    record: React.PropTypes.object.isRequired
  },

  render: function() {
    var record = this.props.record;

    var iconColor = {
      color: record.get('color')
    };

    return (
      <li className="list-group-item">
          <i className="fa fa-tag fa-4 category-icon" style={iconColor}></i>
          <h4>{record.get('name')}</h4>
      </li>
    );
  }

});

module.exports = ListItem;
