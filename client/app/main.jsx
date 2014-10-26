'use strict';

var appRouter;
var io = window.io;
var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var socket = io.connect('http://localhost:4000');

socket.on('born', function (data) {
  console.log(data);
});

/**
 * Create app router component
 */
appRouter = (
  <Routes location="history">
    <Route handler={require('./components/layout.jsx')}>
      <Route name="account" path="/account"
        handler={require('./components/account/Main.jsx')} />
      <Route name="tasks" path="/tasks"
        handler={require('./components/tasks/App.jsx')} />
      <Route name="index" path="/"
        handler={require('./components/index.jsx')} />
    </Route>
  </Routes>
);

React.renderComponent(appRouter, document.getElementById('app'));
