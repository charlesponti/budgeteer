'use strict';

var io = window.io;
window._ = require('lodash');
window.Backbone = require('backbone');
Backbone.$ = window.$;
var Layout = require('./components/Layout.jsx');
var socket = io.connect('http://localhost:4000');

var AppRouter = require('./router.jsx');
AppRouter.start();

socket.on('born', function (data) {
  console.log(data);
});
