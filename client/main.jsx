'use strict';

var $ = require('jquery');
var React = require('react');

// Attach jQuery to Backbone
require('backbone').$ = $;

if (window.io) {
  // Initialise Socket.io
  var socket = io.connect('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}

// Initialise App
window.App = require('./app');

App.init();

App.router = require('./app/router.jsx')(App);

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
var Modal = require('./modal.jsx');
React.render(<Modal/>, document.getElementById('modal'));
