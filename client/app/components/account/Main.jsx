'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var UserStore = require('../../stores/UserStore');
var ConnectedAccount = require('./ConnectedAccount.jsx');
var UserConstants = require('../../constants/UserConstants');

var Account = React.createClass({

  /**
   * @cfg {String}
   */
  displayName: 'Account',

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return { user: undefined, accounts: [] };
  },

  /**
   * Set state of component when UserStore is loaded
   */
  UserStoreRegister: function(payload) {
    switch(payload.action) {
      case UserConstants.LOADED:
        this.setState({
          user: payload.data,
          accounts: UserStore.getUserAccounts() 
        });
        break;
    }
  },

  /**
   * Perform logic when component is about to mount to
   * the DOM
   */
  componentWillMount: function() {
    if (UserStore._user) {
      this.UserStoreRegister({
        action: UserConstants.LOADED,
        data: UserStore.getUser()
      });
    } else {
      UserStore.load();
    }
    UserStore.register(this.UserStoreRegister);
  },

  /**
   * Render component
   * @return {ReactCompositeComponent}
   */
  render: function() {
    var accounts = [];
    _.forIn(this.state.accounts, function(profile, provider) {
      accounts.push(<ConnectedAccount provider={provider} profile={profile} />);
    });
    return (
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 className="text-center"> Account </h1>
        <ul className="list-group">
          <li className="list-group-item">
            <h4>Access Token</h4>
            <p>{UserStore.getAccessToken()}</p>
          </li>
          {accounts}
        </ul>
      </div>
    );
  }

});

module.exports = Account;
