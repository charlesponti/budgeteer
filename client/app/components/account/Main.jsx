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
    return { user: {}, accounts: [] };
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
    return (
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 className="text-center"> Account </h1>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="account-details text-center">
              <p>
                <b>Email:</b> {this.state.user.email}
              </p>
            </div>
          </li>
          {_.map(this.state.accounts, function(profile, provider) {
            return <ConnectedAccount provider={provider} profile={profile} />;
          })}
        </ul>
      </div>
    );
  }

});

module.exports = Account;
