'use strict';

// Connect to WebSocket
var io = window.io;
var socket = io.connect('http://localhost:4000');

// Module dependencies
var React = require('react');

// Attach lodash to window
window._ = require('lodash');

// Attach jQuery to window
window.$ =
window.jQuery = require('jquery');

// Attach Backbone to window
var Backbone =
window.Backbone = require('backbone');
Backbone.$ = $;

// Requery application router and start it
require('./router.jsx');

// Add CSRF token to $.ajax calls
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  var token = $('meta[name="csrf"]').attr('content');

  options.xhrFields = {
    withCredentials: true
  };

  if (token) {
    return jqXHR.setRequestHeader('X-CSRF-Token', token);
  }
});

// Render modal
var Modal = require('./components/Modal.jsx');
React.render(<Modal/>, document.getElementById('modal'));
