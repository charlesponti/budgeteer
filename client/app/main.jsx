'use strict';

// Require nav component
require('./components/nav');

var $ = require('jquery');
var React = require('react');

// Attach jQuery to Backbone
require('backbone').$ = $;

// Instantiate application router
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
