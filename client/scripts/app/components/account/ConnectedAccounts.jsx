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

  propTypes: {
    accounts: React.PropTypes.object.isRequired
  },

  /**
   * Perform logic when component is about to be mounted to
   * DOM
   */
  componentWillMount: function() {
    UserStore.on('loaded', function() {
      this.setState({ accounts: UserStore.getUserAccounts() });
    }.bind(this));
  },

  /**
   * Create and return React DOM
   * @return {object}
   */
  render: function() {
    var accounts = _.each(this.props.accounts, function(account) {
      return <ConnectedAccount account={account} />;
    });
    return (
      <ul className="list-group">{accounts}</ul>
    );
  }

});

module.exports = ConnectedAccounts;
