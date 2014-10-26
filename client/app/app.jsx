"use strict";

/**
 * Module dependencies
 */
var meow = 'cake';
var React = require('react');
var Link = require('react-router').Link;
var UserStore = require('./stores/UserStore');

/**
 * Create Application
 * @requires module: events
 * @requires module: react/lib/merge
 */
var App = module.exports = React.createClass({
  
  getInitialState: function() {
    return { user: undefined };
  },

  /**
   * Handle logic when UserStore is loaded
   * @param {Object} user Current user
   */
  onUserStoreLoaded: function(user) {
    if (this.isMounted()) {
      this.setState({ user: user });
    }
  },

  /**
   * Handle logic when component will mount to DOM
   */
  componentWillMount: function() {
    UserStore.load().on('loaded', this.onUserStoreLoaded);
  },

  /**
   * Render application
   */
  render: function() {
    var logButton, account;

    if (this.state.user) {
      account = <li><Link to="account">Account</Link></li>;
      logButton = <li><a href="/logout">Sign Out</a></li>;
    } else {
      logButton = <li><a href="/login">Sign In</a></li>;
    }

    return (
      <div>
        <nav className="nav navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="nav-header">
              <button className="navbar-toggle collapsed"
                      type="button" data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
               </button>
              <a className="navbar-brand" href='/'> Backpack </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="index">Home</Link></li>
                <li><Link to="tasks">Tasks</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                  { account }
                  { logButton }
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid app">
          {this.props.activeRouteHandler()}
        </div>
      </div>
    );
  }

});
