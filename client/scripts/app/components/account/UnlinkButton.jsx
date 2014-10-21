'use strict';

var React = require('react');

var UnlinkButton = React.createClass({

  /**
   * Get icon for provider
   * @return {ReactCompositeComponent}
   */
  getIcon: function() {
    switch (this.props.provider) {
      case 'twitter':
        return (<span class="fa fa-twitter"></span>);
      case 'google':
        return (<span class="fa fa-google-plus"></span>);
      case 'facebook':
        return (<span class="fa fa-facebook"></span>);
      case 'foursquare':
        return (<span class="fa fa-foursquare"></span>);
      case 'github':
        return (<span class="fa fa-github"></span>);
    }
  },

  /**
   * Get href for button
   * @returns {string}
   */
  getHref: function() {
    return '/unlink/' + this.props.provider;
  },

  render: function() {
    return (
      <a className="btn btn-danger" href={this.getHref()}>
        {this.getIcon()} Unlink {this.props.provider}
      </a>
    );
  }
});

module.exports = UnlinkButton;
