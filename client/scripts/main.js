'use strict';

window.jQuery =
window.$ = require('jquery');

window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = $;

window.React = require('react');

var socket = io.connect('http://localhost:4000');

socket.on('born', function (data) {
  console.log(data);
});

window.App = require("./app/app");

App.start();
