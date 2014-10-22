'use strict';

var React = require('react');
var marked = require('marked');

/**
 * Preview component
 * @type {ReactCompositeComponent}
 */
var Preview = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  /**
   * @returns {ReactCompositeComponent}
   */
  render: function() {
    return (
      <div className="preview">{marked(this.props.text)}</div>
    );
  }

});

module.exports = Preview;
