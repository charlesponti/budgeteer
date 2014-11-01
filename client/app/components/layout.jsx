"use strict";

/**
 * Module dependencies
 */
var React = require('react');
var UserStore = require('../stores/UserStore');
var UserConstants = require('../constants/UserConstants');

/**
 * Create Application
 * @requires module: react
 * @requires module: react-router
 * @requires module: ./stores/UserStore
 */
var Layout = module.exports = React.createClass({
  
  getInitialState: function() {
    return { user: undefined };
  },

  /**
   * Handle logic when UserStore is loaded
   * @param {object} payload
   */
  UserStoreRegister: function(payload) {
    if (this.isMounted()) {
      switch(payload.action) {
        case UserConstants.LOADED:
          this.setState({ user: payload.data });
      }
    }
  },

  /**
   * Handle logic when component will mount to DOM
   */
  componentWillMount: function() {
    UserStore.load();
    UserStore.register(this.UserStoreRegister);
  },

  /**
   * Render application
   */
  render: function() {

  }

});
