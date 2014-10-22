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
    var rawMarkup = marked(this.props.text);
    return (
      <div className="preview" dangerouslySetInnerHTML={{__html: rawMarkup}}/>
    );
  }

});

module.exports = Preview;
