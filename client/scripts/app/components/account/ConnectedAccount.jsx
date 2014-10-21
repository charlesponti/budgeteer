'use strict';

/**
 * Module dependencies
 */
var React = require('react');
var LinkButton = require('./LinkButton.jsx');
var UnlinkButton = require('./UnlinkButton.jsx');

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
    var provider = this.props.provider;
    var profile = this.props.profile.profile;

    return (
      <li className="list-group-item">
        <h4> {this.props.provider} </h4>
        <div class="row">
          <div class="col-sm-4">
            <p>
              <b> Name: </b> {profile.name}
            </p>
            <p>
              <b> Screenname: </b> {profile.screen_name}
            </p>
          </div>
          <div class="col-sm-4">
            <UnlinkButton provider={provider}/>
          </div>
        </div>
      </li>
    );
  }

});

module.exports = ConnectedAccount;
