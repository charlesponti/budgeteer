'use strict';

var React = require('react');
var marked = require('marked');

/**
 * Preview component
 * @type {ReactCompositeComponent}
 */
var Preview = React.createClass({

  propTypes: {
    description: React.PropTypes.string.isRequired
  },

  /**
   * @returns {ReactCompositeComponent}
   */
  render: function() {
    return (
      <div className="preview">{marked(this.props.description)}</div>
    );
  }

});

module.exports = Preview;
