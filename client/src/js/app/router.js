const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const ReactDOM = window.ReactDOM;

import auth from './auth.js';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from '../components/App.js';
import NotFound from '../components/NotFound.js';
import Transactions from '../components/Transactions';
import TransactionForm from '../components/transactions/TransactionForm.js';
import CostPerDay from '../components/CostPerDay';
import CostPerDayForm from '../components/CostPerDay/CostPerDayForm.js';
import Weight from '../components/Weight';
import WeightForm from '../components/Weight/WeightForm.js';
import LogIn from '../components/LogIn.js';

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={LogIn} onEnter={requireAuth}/>
      <Route path="login" component={LogIn}/>
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
  </Router>, document.getElementById('app'));
