'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var LinkButton = require('./LinkButton.jsx');
var UnlinkButton = require('./UnlinkButton.jsx');

/**
 * Component containing all of a user's connected accounts
 * @type {ReactCompositeComponent}
 * @requires module: react
 * @requires module: ./LinkButton
 * @requires module: ./UnlinkButton
 */
var ConnectedAccount = React.createClass({

  displayName: 'ConnectedAccount',

  /**
   * Return formatted name of provider name
   * @return {string} Name of provider
   */
  getProviderName: function() {
    switch(this.props.provider) {
      case 'google':
        return 'Google';
      case 'facebook':
        return 'Facebook';
      case 'twitter':
        return 'Twitter';
      case 'foursquare':
        return 'Foursquare';
      case 'github':
        return 'GitHub';
    }
  },

  getProfileName: function() {

  },

  /**
   * Create and return React DOM
   * @return {object}
   */
  render: function() {
    var provider = this.props.provider;

    return (
      <li className="list-group-item">
        <h4> {this.getProviderName()} </h4>
        <div className="account-details">
          <b> Name: </b> {this.props.profile.name}
        </div>
        <UnlinkButton provider={provider}/>
      </li>
    );
  }

});

module.exports = ConnectedAccount;
