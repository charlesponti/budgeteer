'use strict';

var _ = require('lodash');
var App = require('../../client/app');
var AppConstants = App.constants;
var AppDispatcher = App.dispatcher;
var ConnectedAccount = require('./connected-account.jsx');
var React = require('react');

var Account = React.createClass({

  /**
   * @cfg {String}
   */
  displayName: 'Account',

  /**
   * Get initial state of component
   */
  getInitialState: function() {
    return {
      user: App.user,
      accounts: App.user.getAccounts()
    };
  },

  /**
   * Update state of component when User is changed
   */
  onUserChange: function(user) {
    return this.setState({
      user: user,
      accounts: UserStore.getUserAccounts()
    });
  },

  /**
   * Render component
   * @return {ReactCompositeComponent}
   */
  render: function() {
    var user = this.state.user;
    return (
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 className="text-center"> Account </h1>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="account-details text-center">
              <p>
                <b>Email:</b> {user.get('email')}
              </p>
            </div>
          </li>
          {_.map(user.getAccounts(), function(profile, provider) {
            return <ConnectedAccount provider={provider} profile={profile} />;
          })}
        </ul>
      </div>
    );
  }

});

module.exports = Account;
