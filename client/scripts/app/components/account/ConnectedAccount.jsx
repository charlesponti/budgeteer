'use strict';

/**
 * Module dependencies
 */
var React = require('react');

/**
 * Component containing all of a user's connected accounts
 * @type {ReactCompositeComponent}
 * @requires module: react
 * @requires module: ../../stores/UserStore
 */
var ConnectedAccount = React.createClass({

  displayName: 'ConnectedAccount',

  /**
   * Create and return React DOM
   * @return {object}
   */
  render: function() {
    return (
      <li className="list-group-item">
        <h4>{this.props.account.profile.email}</h4>
      </li>
    );
  }

});

module.exports = ConnectedAccount;
