'use strict';

/**
 * Module dependencies
 */
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;

/**
 * export Routes Component
 */
module.exports = (
  <Routes location="history">
    <Route handler={require('./app.jsx')}>
      <Route name="account" path="/account"
        handler={require('./components/account/Main.jsx')} />
      <Route name="tasks" path="/tasks"
        handler={require('./components/tasks/App.jsx')} />
      <Route name="index" path="/"
        handler={require('./components/index.jsx')} />
    </Route>
  </Routes>
);
