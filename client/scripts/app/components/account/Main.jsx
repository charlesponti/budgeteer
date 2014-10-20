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

  props: {
    user: React.PropTypes.object,
    accounts: React.PropTypes.object
  },

  statics: {
    onUserStoreLoaded: function() {
      this.setState({
        user: UserStore.getUser(),
        accounts: UserStore.getUserAccounts() 
      });
    }
  },

  componentWillMount: function() {
    if (UserStore._user) {
      Account.onUserStoreLoaded();
    } else {
      UserStore.on('loaded', Account.onUserStoreLoaded);
    }
  },

  render: function() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1 className="text-center"> Account </h1>
        <ConnectedAccounts accounts={this.props.accounts} />
      </div>
    );
  }

});

module.exports = Account;
