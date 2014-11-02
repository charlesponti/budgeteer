'use strict';

// Module dependencies
var React = require('react');

// Application dependencies
var UserStore = require('../../stores/UserStore');
var AppConstants = require('../../constants/App');
var AppDispatcher = require('../../dispatchers/App');

// Components
var ConnectedAccount = require('./ConnectedAccount.jsx');

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
  onUserStoreChange: function(user) {
    this.setState({
      user: user,
      accounts: UserStore.getUserAccounts() 
    });
  },

  /**
   * Perform logic when component is about to mount to
   * the DOM
   */
  componentWillMount: function() {
    if (UserStore._user) {
      this.onUserStoreChange(UserStore._user);
    } else {
      UserStore.on('change', this.onUserStoreChange);
      UserStore.load();
    }
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
