'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var LinkButton = require('./link-button.jsx');
var UnlinkButton = require('./unlink-button.jsx');

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

  /**
   * Create and return React DOM
   * @return {object}
   */
  render: function() {
    var profile = this.props.profile;
    var provider = this.props.provider;
    return (
      <li className="list-group-item text-center">
        <h4> {this.getProviderName()} </h4>
        <br/>
        <img className="account-provider-img" src={profile.photo} />
        <br/>
        <div className="account-details">
          <b> Name: </b> {profile.name}
        </div>
        <UnlinkButton provider={provider}/>
      </li>
    );
  }

});

module.exports = ConnectedAccount;
