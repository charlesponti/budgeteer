import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import auth from './auth';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from '../components/App.js';
import NotFound from '../components/NotFound.js';
import Transactions from '../components/Transactions/TransactionsList';
import TransactionForm from '../components/Transactions/TransactionForm.js';
import CostPerDay from '../components/CostPerDay';
import CostPerDayForm from '../components/CostPerDay/CostPerDayForm.js';
import Weight from '../components/Weight';
import WeightForm from '../components/Weight/WeightForm.js';
import LogIn from '../components/LogIn.js';

function requireAuth(nextState, replaceState) {
  const authenticated = auth.isLoggedIn();

  if (nextState.location.pathname === '/login' && authenticated) {
    replaceState({ nextPathname: nextState.location.pathname}, '/transactions');
  } else if (!authenticated) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

export default (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Transactions} onEnter={requireAuth}/>
      <Route path="login" component={LogIn} onEnter={requireAuth}/>
      <Route path="transactions" onEnter={requireAuth}>
        <IndexRoute component={Transactions}/>
        <Route path="new" component={TransactionForm}/>
      </Route>
      <Route path="cost-per-day" onEnter={requireAuth}>
        <IndexRoute component={CostPerDay}/>
        <Route path="new" component={CostPerDayForm}/>
      </Route>
      <Route path="weight" onEnter={requireAuth}>
        <IndexRoute component={Weight}/>
        <Route path="new" component={WeightForm}/>
      </Route>
    </Route>
  </Router>
);
