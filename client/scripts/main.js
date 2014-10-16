'use strict';

var io = window.io;
window.$ = require('jquery');
window.Backbone = require('backbone');
Backbone.$ = $;

var socket = io.connect('http://localhost:4000');

socket.on('born', function (data) {
  console.log(data);
});

var AppModel = require("./app/app");
window.App = new AppModel();

App.start();
