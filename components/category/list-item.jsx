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
    category: React.PropTypes.object.isRequired
  },

  render: function() {
    var category = this.props.category;

    var iconColor = {
      color: category.get('color')
    };

    return (
      <li className="list-item">
          <i className="fa fa-tag fa-4 category-icon" style={iconColor}></i>
          <span>{category.get('name')}</span>
      </li>
    );
  }

});

module.exports = ListItem;
