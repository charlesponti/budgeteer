'use strict';

var io = window.io;
var React = require('react');
var socket = io.connect('http://localhost:4000');

socket.on('born', function (data) {
  console.log(data);
});

React.renderComponent(require("./router.jsx"), document.body);
