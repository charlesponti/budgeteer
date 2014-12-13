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

    var style = {
      color: record.color,
      display: 'inline-block',
      marginRight: '1em',
      fontSize: '3em'
    };

    return (
      <li className="list-group-item">
          <i className="fa fa-tag fa-4 category-icon" style={style}></i>
          <h4>{record.name}</h4>
      </li>
    );
  }

});

module.exports = ListItem;
