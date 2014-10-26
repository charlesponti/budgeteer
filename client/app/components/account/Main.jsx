'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var UserStore = require('../../stores/UserStore');
var ConnectedAccounts = require('./ConnectedAccounts.jsx');

var Account = React.createClass({

  /**
   * @cfg {String}
   */
  displayName: 'Account',

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return { user: null, accounts: null };
  },

  /**
   * Set state of component when UserStore is loaded
   */
  onUserStoreLoaded: function() {
    this.setState({
      user: UserStore.getUser(),
      accounts: UserStore.getUserAccounts() 
    });
  },

  /**
   * Perform logic when component is about to mount to
   * the DOM
   */
  componentWillMount: function() {
    if (UserStore._user) {
      this.onUserStoreLoaded();
    } else {
      UserStore.on('loaded', this.onUserStoreLoaded);
    }
  },

  render: function() {
    return (
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 className="text-center"> Account </h1>
        <p>
          <b>Access Token</b> {UserStore.getAccessToken()}
        </p>
        <ConnectedAccounts accounts={this.state.accounts} />
      </div>
    );
  }

});

module.exports = Account;
