'use strict';

var React = require('react');

var Chart = React.createClass({

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    children: React.PropTypes.array
  },

  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }

});

module.exports = Chart;
