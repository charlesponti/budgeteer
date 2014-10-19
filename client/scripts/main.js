'use strict';

var io = window.io;
var React = require('react');
var socket = io.connect('http://localhost:4000');

socket.on('born', function (data) {
  console.log(data);
});

var router = require("./app/router.jsx");

React.renderComponent(router, document.body);
