"use strict";

/**
 * Module dependencies
 */
var React = require('react');
var Link = require('react-router').Link;

/**
 * Create Application
 * @requires module: events
 * @requires module: react/lib/merge
 */
var App = module.exports = React.createClass({

  getCSRF: function() {
    return $('#csrf').data('value');
  },

  render: function() {
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
                  <li>
                    <a id="user" href="/account"> Account</a>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                  <li>
                    <a href="/login"> Log In </a>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid app">
          {this.props.activeRouteHandler()}
        </div>
      </div>
    );
  },

  renderIndex: function() {
    return (
      <div>
        <h2>Index</h2>
      </div>
    );
  }

});
