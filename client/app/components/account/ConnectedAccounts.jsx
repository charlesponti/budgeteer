'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var UserStore = require('../../stores/UserStore');
var ConnectedAccount = require('./ConnectedAccount.jsx');

/**
 * Component containing all of a user's connected accounts
 * @type {ReactCompositeComponent}
 * @requires module: react
 * @requires module: ../../stores/UserStore
 */
var ConnectedAccounts = React.createClass({

  /**
   * Create and return React DOM
   * @return {object}
   */
  render: function() {
    var accounts = [];
    _.forIn(this.props.accounts, function(profile, provider) {
      accounts.push(<ConnectedAccount provider={provider} profile={profile} />);
    });
    return (
      <ul className="list-group">{accounts}</ul>
    );
  }

});

module.exports = ConnectedAccounts;
