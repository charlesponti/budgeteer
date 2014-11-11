'use strict';

// Connect to WebSocket
var io = window.io;
var socket = io.connect('http://localhost:4000');

socket.on('born', function (data) {
  console.log(data);
});

socket.on('tasks', function (data) {
  console.log(data);
});

// Module dependencies
var React = require('react');

// Create factory for Modal
var Modal = React.createFactory(require('./components/Modal.jsx'));

// Attach lodash to window
window._ = require('lodash');

// Attach jQuery to window
window.$ = 
window.jQuery =
require('jquery');

// Attach Backbone to window
window.Backbone = require('backbone');
Backbone.$ = $;

// Requery application router and start it
require('./router.jsx');

// Render modal
React.render(<Modal/>, document.getElementById('modal'));
